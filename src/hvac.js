var requestId = 'test-id'

var receivedMessages = document.getElementById('receivedMessages');

var authToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJrdWtzYS52YWwiLCJpc3MiOiJFY2xpcHNlIEtVS1NBIERldiIsImFkbWluIjp0cnVlLCJtb2RpZnlUcmVlIjp0cnVlLCJpYXQiOjE1MTYyMzkwMjIsImV4cCI6MTc2NzIyNTU5OSwia3Vrc2EtdnNzIjp7IioiOiJydyJ9fQ.p2cnFGH16QoQ14l6ljPVKggFXZKmD-vrw8G6Vs6DvAokjsUG8FHh-F53cMsE-GDjyZH_1_CrlDCnbGlqjsFbgAylqA7IAJWp9_N6dL5p8DHZTwlZ4IV8L1CtCALs7XVqvcQKHCCzB63Y8PgVDCAqpQSRb79JPVD4pZwkBKpOknfEY5y9wfbswZiRKdgz7o61_oFnd-yywpse-23HD6v0htThVF1SuGL1PuvGJ8p334nt9bpkZO3gaTh1xVD_uJMwHzbuBCF33_f-I5QMZO6bVooXqGfe1zvl3nDrPEjq1aPulvtP8RgREYEqE6b2hB8jouTiC_WpE3qrdMw9sfWGFbm04qC-2Zjoa1yYSXoxmYd0SnliSYHAad9aXoEmFENezQV-of7sc-NX1-2nAXRAEhaqh0IRuJwB4_sG7SvQmnanwkz-sBYxKqkoFpOsZ6hblgPDOPYY2NAsZlYkjvAL2mpiInrsmY_GzGsfwPeAx31iozImX75rao8rm-XucAmCIkRlpBz6MYKCjQgyRz3UtZCJ2DYF4lKqTjphEAgclbYZ7KiCuTn9HualwtEmVzHHFneHMKl7KnRQk-9wjgiyQ5nlsVpCCblg6JKr9of4utuPO3cBvbjhB4_ueQ40cpWVOICcOLS7_w0i3pCq1ZKDEMrYDJfz87r2sU9kw1zeFQk';

var socket = new WebSocket('wss://localhost:8090');

socket.onmessage = function(event) {
    appendReceivedMessage(event.data);
    var jsonData = JSON.parse(event.data);

    if (jsonData.action == 'get' ||
        jsonData.action =='subscription') {
        updateVehicleInfo(jsonData);
    }
}

socket.onopen = function(event) {
    updateConnectionStatus('Connected');
    init();
}

socket.onerror = function(event) {
    updateConnectionStatus('Failed to connect');
}

function updateConnectionStatus(status) {
    //connectionStatus.innerHTML = status;
}

function appendReceivedMessage(message) {
    receivedMessages.insertAdjacentHTML('beforeend', message);
    receivedMessages.scrollTop = receivedMessages.scrollHeight;
}

function init() {
    authorize();
    subscribe(PATHS.vehicleLeftAc);
    subscribe(PATHS.vehicleRightAc);
    subscribe(PATHS.ac);
    subscribe(PATHS.recirculation);
    randomizeVehicleInfo();
}

function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function randomBool() {
    return Math.random() < 0.5;
}

function refreshVehicleInfo() {
    get(PATHS.vehicleLeftAc);
    get(PATHS.vehicleRightAc);
    get(PATHS.ac);
    get(PATHS.recirculation);
}

function randomizeVehicleInfo() {
    set(PATHS.vehicleLeftAc, 'down');
    set(PATHS.vehicleRightAc, 'middle');
    set(PATHS.ac, randomBool());
    set(PATHS.recirculation, randomBool());

    refreshVehicleInfo();
}

function updateVehicleInfo(message) {
    var value = message.data.dp.value;
    var path = message.data.path;
    switch (path) {
        case PATHS.ac:
        case PATHS.recirculation:
            BUTTONS.update(path, value);
            break;
        case PATHS.vehicleLeftAc:
        case PATHS.vehicleRightAc:
            CHAIRS.update(path, value);
            break;
    }
}

function authorize() {
    var data = {
        action: 'authorize',
        tokens: authToken,
        requestId: requestId,
    };
    socket.send(JSON.stringify(data));
}

function subscribe(path) {
    var data = {
        action: 'subscribe',
        tokens: authToken,
        requestId: requestId,
        path: path,
    };
    socket.send(JSON.stringify(data));
}

function get(path) {
    var data = {
        action: 'get',
        tokens: authToken,
        requestId: requestId,
        path: path,
    };
    socket.send(JSON.stringify(data));
}

function set(path, value) {
    var data = {
        action: 'set',
        tokens: authToken,
        requestId: requestId,
        path: path,
        value: value,
    };
    socket.send(JSON.stringify(data));
}

module.exports = {
    init: init,
    get: get,
    set: set,
};
