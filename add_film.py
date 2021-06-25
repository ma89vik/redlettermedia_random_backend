from typing import final
from bs4 import BeautifulSoup
from selenium import webdriver, common
from pathlib import Path
from selenium.webdriver.firefox.options import Options
import re
import json
from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport

URL = 'https://letterboxd.com/shaynepc/list/best-of-the-worst-a-list-of-all-movies-featured/page/'


class Film(json.JSONEncoder):
    BASE_URL = 'https://letterboxd.com'

    def __init__(self, name, rel_url, img_source):
        self.data = {}
        self.data['title'] = name
        self.data['poster'] = img_source
        self.data['url'] = self.BASE_URL + rel_url



films = []

def dump_to_file(films):
    json_prep = [film.data for film in films]

    with open('films.json', 'w') as f:
        f.write(json.dumps(json_prep))


def scrape_films():
    print("Get films from web")
    options = Options()
   # options.headless = True

    pages = [1,2,3]

    with webdriver.Firefox(options=options, executable_path=Path.home() / 'geckodriver') as browser:

        for page in pages:
            try:
                browser.get(f'{URL}/{page}')
                browser.execute_script("window.scrollTo(0,document.body.scrollHeight)")
            except common.exceptions.TimeoutException:
                pass

            soup = BeautifulSoup(browser.page_source, "html.parser")
            postlist = soup.select("[class~=poster-container]")

            for film in postlist:
                try:
                    name = film.img['alt']
                    image_source = film.img['src']
                    rel_url = re.search(r'data-film-slug=\"(.*?)\"', str(film)).group(1)

                except AttributeError:
                        rel_url = re.search(r'data-film-link=\"(.*?)\"', str(film)).group(1)
                finally:
                    films.append(Film(name, rel_url, image_source))

    dump_to_file(films)


addFilmQuery = gql(
    """
    mutation addFilm ($film: FilmInput!){
        addFilm (film: $film) {
            title
        }
    }
"""
)

def update_database():
    # Select your transport with a defined url endpoint
    transport = AIOHTTPTransport(url="http://localhost:4000/")
    # Create a GraphQL client using the defined transport
    client = Client(transport=transport, fetch_schema_from_transport=True, execute_timeout=100)

    with open('films.json') as f:
        films = json.loads(f.read())

    for film in films:
        params = {"film": film}
        print("add film:")
        print(params)
        client.execute(addFilmQuery, variable_values=params)




if __name__ == '__main__':
    #scrape_films()
    update_database()

