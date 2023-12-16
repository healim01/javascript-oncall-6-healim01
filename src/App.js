import OnCallController from "./controller/OnCallController.js";

class App {
  async run() {
    const onCallController = new OnCallController();
    await onCallController.start();
  }
}

export default App;
