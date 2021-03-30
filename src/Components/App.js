import { without } from "lodash";
import { Component } from "react";
import "../css/App.css";
import AddAppointment from "./AddApointement";
import ListAppointment from "./ListApointement";
import SearchAppointment from "./SearchApointement";

class App extends Component {
  constructor() {
    super();
    this.state = {
      myAppointment: [],
      lastIndex: 0,
    };
    this.deleteAppiontment = this.deleteAppiontment.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  deleteAppiontment(apt) {
    let Setapt = this.state.myAppiontment;
    Setapt = without(Setapt, apt);
    this.setState({
      myAppiontment: Setapt,
    });
  }

  componentDidMount() {
    fetch("./data.json")
      .then((response) => response.json())
      .then((result) => {
        const apt = result.map((item) => {
          item.aptId = this.state.lastIndex;
          item.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myAppointment: apt,
        });
      });
  }

  render() {
    return (
      <main className="page bg-white" id="petratings">
        <div className="container">
          <div className="row">
            <div className="col-md-12 bg-white">
              <div className="container">
                <AddAppointment />
                <SearchAppointment />
                <ListAppointment
                  appointment={this.state.myAppointment}
                  deleteAppiontment={this.deleteAppiontment}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
