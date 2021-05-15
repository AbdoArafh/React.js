class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            input: ""
        };
    }

    render = () => {
        return (
            <div>
                <h1>TODO LIST</h1>
                <input
                    onChange={this.handleChange}
                    type="text" name="input"
                    placeholder="Add Task"
                    value={this.state.input}
                    autoComplete="off"
                    autoFocus
                />
                &nbsp;
                <button onClick={this.addTask}>ADD</button>
                <ul>
                    {this.state.tasks.map((task, index) => {
                        return (
                            <li key={index}>
                                <button onClick={this.deleteTask} data-index={index} key={index}>Done</button>
                                &nbsp;
                                {task}
                            </li>
                        )
                    })}
                </ul>
            </div>
        );
    }

    handleChange = (event) => {
        this.setState({
            input: event.target.value
        });
    }

    addTask = () => {
        this.setState(state => {
            let tasks = [...state.tasks, state.input];
            return {tasks, input: ""};
        });
    }

    deleteTask = (event) => {
        this.setState(state => {
            let tasks = [...state.tasks];
            tasks.splice(event.target.dataset.index, 1);
            return {tasks};
        });
    }
}

ReactDOM.render(
                React.createElement(Todo),
                document.getElementById("container"));