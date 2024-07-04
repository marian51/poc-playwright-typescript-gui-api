import { test as setup } from "@playwright/test";
import { ApiHooks } from "../api-utils/apiHooks";

setup("Remove the setup Space", async ({ request }) => {
  // await ApiHooks.deleteSpaceByName(request, "SETUP_SPACE");
});
