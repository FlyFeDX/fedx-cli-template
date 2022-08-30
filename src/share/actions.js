const emptyAction = () => {};

class Actions {
    // 默认值为空 Action
    actions = {
        onGlobalStateChange: emptyAction,
        setGlobalState: emptyAction,
        postMessage: emptyAction,
    };

    messageTypes = {};

    init() {
        if (this.actions && typeof this.actions.onGlobalStateChange === 'function') {
            this.actions.onGlobalStateChange((props, prev) => {
                const { setGlobalState, postMessage, messageTypes } = props;
                this.actions.postMessage = postMessage;
                this.actions.setGlobalState = setGlobalState;
                this.messageTypes = messageTypes;
            }, true);
        }
    }

    /**
     * 设置 actions
     */
    setActions(actions) {
        this.actions = actions;
    }

    onGlobalStateChange(...args) {
        if (this.actions && typeof this.actions.onGlobalStateChange === 'function') {
            return this.actions.onGlobalStateChange(...args);
        }
    }

    setGlobalState(...args) {
        if (this.actions && typeof this.actions.setGlobalState === 'function') {
            return this.actions.setGlobalState(...args);
        }
    }

    postMessage(...args) {
        if (this.actions && typeof this.actions.postMessage === 'function') {
            return postMessage(args);
        }
    }
}

const actions = new Actions();
export default actions;
