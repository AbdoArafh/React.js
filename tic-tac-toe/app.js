class TicTacToe extends React.Component {
    constructor(props) {
        super(props);
        this.dimention = 3;
        this.players = ["X", "O"];
        this.state = {
            // board: this.array2d(this.dimention),
            board: this.array2d(this.dimention),
            player: this.players[Math.floor(Math.random() * this.players.length)],
            message: "",
            X: 0,
            O: 0
        };
    }

    componentDidMount() {
        const xwins = localStorage.getItem("X");
        const owins = localStorage.getItem("O");
        if (xwins != null && owins != null) {
            this.setState({
                X: parseInt(xwins),
                O: parseInt(owins)
            });
        }

        window.addEventListener("beforeunload", () => {
            localStorage.setItem("X", this.state.X);
            localStorage.setItem("O", this.state.O);
        });

        window.addEventListener("keyup", (event) => {
            if (event.key == "r" || event.key == "R") {
                this.resetScore();
            }
        });
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <td>
                                X: {this.state.X}
                            </td>
                            <td></td>
                            <td>
                                O: {this.state.O}
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.board.map((row, i) => {
                            return (
                            <tr key={i}>    
                                {row.map((cell, j) => {
                                    return (
                                        <td key={i + j * this.dimention}>
                                            <button
                                            data-player={cell}
                                            onClick={this.played}
                                            key={i + j * this.dimention}
                                            data-row={i}
                                            data-col={j}
                                            style={{width:3 + "rem", height:3 + "rem"}}>
                                                {cell}
                                            </button>
                                        </td>
                                    )
                                })}
                            </tr>
                            )
                        })}
                    </tbody>
                </table>
                <p>{this.state.message}</p>
                <button onClick={this.resetScore}>Reset Score</button>
            </div>
        )
    }

    resetScore = () => {
        this.setState({
            X: 0,
            O: 0,
            message: ""
        })
    }

    played = (event) => {
        const cell = event.target.dataset.player;
        if (cell != "") {
            return
        }

        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
        this.setState(state => {
            let player = this.state.player;
            let board = [...state.board];
            board[row][col] = player;
            player = player == "X" ? "O" : "X";
            return ({board, player});
        }, this.checkWins);
    }

    checkWins = () => {
        const winner = this.isWin();
        if (winner != null) {
            this.setState(state => ({
                [winner]: state[winner] + 1,
                message: winner + " is the winner!",
                player: winner,
                board: this.array2d(this.dimention)
            }));
        }
        else if (this.isTie()) {
            this.setState({
                message: "It's a tie!",
                board: this.array2d(this.dimention)
            });
        }
    }

    isTie = () => {
        let sum = 0;
        for (let i of this.state.board) {
            for (let j of i) {
                if (j != "") sum++;
            }
        }
        if (sum == Math.pow(this.dimention, 2)) return true;
        return false;
    }

    isWin = () => {
        // todo make it a bit cleaner

        const player = this.state.player == "X" ? "O" : "X";
        const board = this.state.board;
        let sum = 0;
        let otherSum = 0;
        for (let i = 0; i < this.dimention; i++) {
            sum = 0;
            otherSum = 0;
            for (let j = 0; j < this.dimention; j++) {
                if (board[0][j] == player) sum++;
                if (board[j][i] == player) otherSum++;
            }
            if (sum == this.dimention || otherSum == this.dimention) return player;
        }

        sum = 0;
        otherSum = 0;
        for (let i = 0; i < this.dimention; i++) {
            if (board[i][i] == player) sum++;
            if (board[i][this.dimention - 1 - i] == player) otherSum++; 
        }
        if (sum == this.dimention || otherSum == this.dimention) return player;

        return null;
    }

    array2d = (dimention=3) => {
        let array = [];
        for (let i = 0; i < dimention; i++) {
            let subArray = [];
            for (let i = 0; i < dimention; i++) {
                subArray.push("");
            }
            array.push(subArray);
        }
        return array;
    }
}

ReactDOM.render(React.createElement(TicTacToe), document.getElementById("container"));