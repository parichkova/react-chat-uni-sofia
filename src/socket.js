
const AppConfig = {
    PROTOCOL: "ws:",
    // TODO: change to localhost if you wish to run it locally
    HOST: "//ec2-54-152-175-228.compute-1.amazonaws.com",
    PORT: ":9000"
}

const Singleton = (function () {
    let instance;

    function createInstance() {
        // TODO: add +  PORT if you want to run it locally
        const socket = new WebSocket(AppConfig.PROTOCOL + AppConfig.HOST+ AppConfig.PORT);
        return socket;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

export default Singleton;