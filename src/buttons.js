var buttons = {
    ac: {
        element: null,
        value: false
    },
    auto: {
        element: null,
        value: false
    },
    recirculation: {
        element: null,
        value: false
    },
};

function init() {
    buttons.ac.element = document.getElementById('ac');
    buttons.auto.element = document.getElementById('auto');
    buttons.recirculation.element = document.getElementById('recirculation');
}

function update(path, value) {
    var src = value ? ASSETS.hvacActive : ASSETS.hvacInactive;
    var button = null;
    switch (path) {
        case PATHS.ac:
            button = buttons.ac;
            break;
        case PATHS.auto:
            button = buttons.auto;
            break;
        case PATHS.recirculation:
            button = buttons.recirculation;
            src = value ? ASSETS.recirculationActive : ASSETS.recirculationInactive;
            break;
    }
    if (!button)
        return;
    button.element.src = src;
    button.value = value;
}

module.exports = {
    toggle: function(node) {
        var key = node.getAttribute('key');
        HVAC.set(PATHS[key], !buttons[key].value);
    },
    update: update,
    init: init
}
