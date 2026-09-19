const { QueryClient, MutationObserver } = require('@tanstack/query-core');
const client = new QueryClient();
let state = 'A';
const observer = new MutationObserver(client, {
  mutationFn: async () => {
    return state;
  }
});
state = 'B';
observer.setOptions({
  mutationFn: async () => {
    return state;
  }
});
state = 'C';
observer.mutate().then(console.log);
