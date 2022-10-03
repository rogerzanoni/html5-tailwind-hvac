var chairs = {
    leftChair: {
        element: null,
        value: 0,
    },
    leftChairIndicator: null,
    rightChair: {
        element: null,
        value: 0,
    },
    rightChairIndicator: null,
};

var acValues = new Array('down', 'middle', 'up');

function init() {
    chairs.leftChair.element = document.getElementById('leftChair');
    chairs.rightChair.element = document.getElementById('rightChair');
    chairs.leftChairIndicator = document.getElementById('leftChairIndicator');
    chairs.rightChairIndicator = document.getElementById('rightChairIndicator');
}

function update(path, value){
    var chair = null, indicator = null;
    var chairSrc="", indicatorSrc="";
    if (path == PATHS.vehicleLeftAc) {
        chair = chairs.leftChair;
        indicator = chairs.leftChairIndicator;
        chairSrc = value != 'down' ? ASSETS.leftChairOn : ASSETS.leftChairOff;
    } else {
        chair = chairs.rightChair;
        indicator = chairs.rightChairIndicator;
        chairSrc = value != 'down' ? ASSETS.rightChairOn : ASSETS.rightChairOff;
    }

    chair.value = acValues.indexOf(value);

    if (value == 'down') {
        indicatorSrc = ASSETS.chairIndicatorOff;
    } else if (value == 'middle') {
        indicatorSrc = ASSETS.chairIndicatorOne;
    } else {
        indicatorSrc = ASSETS.chairIndicatorTwo;
    }

    chair.element.src = chairSrc;
    indicator.src = indicatorSrc;
}

module.exports = {
    left: function(node) {
        chairs.leftChair.value = (chairs.leftChair.value + 1) % 3;
        HVAC.set(PATHS.vehicleLeftAc, acValues[chairs.leftChair.value]);
    },
    right: function(node) {
        chairs.rightChair.value = (chairs.rightChair.value + 1) % 3;
        HVAC.set(PATHS.vehicleRightAc, acValues[chairs.rightChair.value]);
    },
    init: init,
    update: update,
}
