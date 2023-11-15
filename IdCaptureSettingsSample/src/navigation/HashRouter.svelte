<script>
  import { createHashHistorySource } from "@/navigation/createHashHistory";
  import { createHistory, Router } from "svelte-navigator";

  const hashHistorySource = createHashHistorySource();
  const hashHistory = createHistory(hashHistorySource);
</script>

<Router history={hashHistory}>
  <slot />
</Router>
