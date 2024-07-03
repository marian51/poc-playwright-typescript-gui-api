import { test as setup } from "@playwright/test";
import { ApiHooks } from "../api-utils/apiHooks";

setup("Create a Space with one List", async ({ request }) => {
  const spaceName = "SETUP_SPACE";
  const listName = "SETUP_LIST";
  await ApiHooks.createSpaceByName(request, spaceName);
  await ApiHooks.createFolderlessList(request, spaceName, listName);
});
