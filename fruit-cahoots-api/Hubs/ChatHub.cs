using Microsoft.AspNetCore.SignalR;

namespace SignalRChat.Hubs
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            Console.WriteLine("connectionId {0}", Context.ConnectionId);
            await Clients.All.SendAsync("ReceiveMessage", user, message);
        }
        public async Task CreateLobby()
        {
            Console.WriteLine("connectionId {0}", Context.ConnectionId);

            string gameId = RandomString(8);
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Client(Context.ConnectionId).SendAsync("LobbyCreated", gameId);
        }

        public async Task StartGame(string gameId)
        {
            Console.WriteLine("connectionId {0}", Context.ConnectionId);

            var message = String.Format("started {0}", gameId);
            await Clients.Group(gameId).SendAsync("GameStarted", message);
        }

        private static Random random = new Random();

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
                .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}