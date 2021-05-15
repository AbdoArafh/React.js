class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            input: ""
        };

        window.addEventListener("keyup", (event) => {
            if (event.keyCode == 13) {
                this.addTask();
            }
        })
    }

    componentDidMount () {
        const tasks = localStorage.getItem("tasks");
        if (tasks !== null) {
            this.setState({tasks: tasks.split(",")});
        }
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("tasks", this.state.tasks);
        })
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
        if (this.state.input != "") {
            this.setState(state => {
                let tasks = [...state.tasks, state.input];
                return {tasks, input: ""};
            });
        }
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