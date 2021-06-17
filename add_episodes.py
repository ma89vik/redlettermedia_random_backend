from gql import gql, Client
from gql.transport.aiohttp import AIOHTTPTransport
import datetime
import csv

addEpisodeQuery = gql(
    """
    mutation addEpisode ($episode: EpisodeInput!){
        addEpisode (episode: $episode) {
            title
        }
    }
"""
)

dropCollectionsQuery = gql(
    """
    mutation dropCollections {
        dropCollections
    }
"""
)

class Episode:
    def __init__(self, header, episode_data) -> None:
        self.episode_info = dict(zip(header, episode_data))

    def get_films(self):
        films = []
        if self.episode_info['First Film']:
            films.append({ "title": self.episode_info['First Film']})

        if self.episode_info['Second Film']:
            films.append({ "title": self.episode_info['Second Film']})

        if self.episode_info['Third Film']:
            films.append({ "title": self.episode_info['Third Film']})

        return films

    def get_release_date(self):
        return datetime.datetime.strptime(self.episode_info['Date Released'], '%m/%d/%Y').date().isoformat()

    def get_title(self):
        # TODO Change to fetch title from youtube here
        return "Episode " + self.episode_info['Episode']

    def get_hosts(self):
        hosts = []
        if self.episode_info['Mike'] == '✓':
            hosts.append('Mike')
        if self.episode_info['Jay'] == '✓':
            hosts.append('Jay')
        if self.episode_info['Rich'] == '✓':
            hosts.append('Rich')
        if self.episode_info['Jack'] == '✓':
            hosts.append('Jack')
        if self.episode_info['Josh'] == '✓':
            hosts.append('Josh')
        if self.episode_info['Jessi'] == '✓':
            hosts.append('Jessi')
        if self.episode_info['Guests'] != 'X':
            hosts.append(self.episode_info['Guests'])

        return hosts

    def get_gimmick(self):
        gimmick = self.episode_info['Gimmick']

        if gimmick == 'X':
            return 'Best of the Worst'
        elif gimmick == 'Wheel of the Worst' or gimmick == 'Plinketto':
            return gimmick
        else:
            return 'Other'

    def to_grapql_params(self):
        grapql_params = {
            "title": self.get_title(),
            "films": self.get_films(),
            'releaseDate': self.get_release_date(),
            'hosts': self.get_hosts(),
            'gimmick': self.get_gimmick(),
        }

        return grapql_params


# Select your transport with a defined url endpoint
transport = AIOHTTPTransport(url="http://localhost:4000/")
# Create a GraphQL client using the defined transport
client = Client(transport=transport, fetch_schema_from_transport=True)

#cleanup old data
result = client.execute(dropCollectionsQuery)

with open('botw.csv', newline='') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    headers = csvreader.__next__()

    episodes = [Episode(headers, data) for data in csvreader]


for episode in episodes:
    params = {"episode": episode.to_grapql_params()}
    result = client.execute(addEpisodeQuery, variable_values=params)


