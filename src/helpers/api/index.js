import storage from "../storage";
import { APPLICATION_SERVER } from "../../constants";

class This {
  constructor() {
    this.token = storage.get("user_data" || "")?.token;
    this.adminToken = storage.get("adminToken");
    this.url = APPLICATION_SERVER;
  }
}

export default This;
