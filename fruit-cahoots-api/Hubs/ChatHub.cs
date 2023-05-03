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
            string gameId = "test lobby";
            await Groups.AddToGroupAsync(Context.ConnectionId, gameId);
            await Clients.Client(Context.ConnectionId).SendAsync("LobbyCreated", gameId);
        }

        public async Task StartGame(string gameId)
        {
            await Clients.Group("test lobby").SendAsync("GameStarted", "hullo");
        }
    }
}