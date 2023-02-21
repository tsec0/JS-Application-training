import { checkUserNav } from "./auth.js";
import { showCatalogView } from "./catalog.js";
import './details.js' // load the file
import "./login.js";  // load the file

// Start apps in  cataloag view
showCatalogView();
checkUserNav();
