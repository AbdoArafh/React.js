class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
        window.addEventListener("keyup", (event) => {
            if (event.key == " ") {
                this.increment();
            }
            if (event.key == "r" || event.key == "R") {
                this.reset();
            }
        });
    }

    increment = () => {
        this.setState(state => {
            const count = state.count + 1;
            return {count}
        });
    }

    decrement = () => {
        if (this.state.count > 0) {
            this.setState(state => {
                const count = state.count - 1;
                return {count}
            });
    }
    }

    reset = () => {
        this.setState({
            count: 0
        });
    }

    render() {
        return (
            <div>
                <h1>{this.state.count}</h1>
                <div>
                    <button onClick={this.increment}>+</button>
                    <button onClick={this.decrement}>-</button>
                    <button onClick={this.reset}>reset</button>
                </div>
            </div>
        );
    }
}


ReactDOM.render(React.createElement(Counter), document.getElementById("container"))