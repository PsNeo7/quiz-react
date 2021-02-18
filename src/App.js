import './App.css';
import { Component } from "react";

class App extends Component {

  state = {
    questions: [
      {
        id: 1,
        question: "Whats 1+1?",
        options: [{ option: '2', correct: true }, { option: '1', correct: false }, { option: '3', correct: false }, { option: '0', correct: false }]
      },
      {
        id: 2,
        question: "Whats 1+2?",
        options: [{ option: '2', correct: false }, { option: '13', correct: false }, { option: '3', correct: true }, { option: '0', correct: false }]
      },
      {
        id: 3,
        question: "Whats 1-1?",
        options: [{ option: '2', correct: false }, { option: '1', correct: false }, { option: '3', correct: false }, { option: '0', correct: true }]
      },
      {
        id: 4,
        question: "Whats 1-1?",
        options: [{ option: '11', correct: false }, { option: '1', correct: false }, { option: '23', correct: false }, { option: '0', correct: true }]
      },
      {
        id: 5,
        question: "Whats 1*1?",
        options: [{ option: '111', correct: false }, { option: '1', correct: true }, { option: '333', correct: false }, { option: '0', correct: false }]
      },
      {
        id: 6,
        question: "Whats 1%1?",
        options: [{ option: '2', correct: false }, { option: '1', correct: true }, { option: '3', correct: false }, { option: '0', correct: false }]
      },
      {
        id: 7,
        question: "Whats 10-1?",
        options: [{ option: '2', correct: false }, { option: '1', correct: false }, { option: '3', correct: false }, { option: '9', correct: true }]
      },
      {
        id: 8,
        question: "Whats 11-1?",
        options: [{ option: '10', correct: true }, { option: '111', correct: false }, { option: '3', correct: false }, { option: '1', correct: false }]
      }
      ,
      {
        id: 9,
        question: "Whats 1-1?",
        options: [{ option: '2', correct: false }, { option: '1', correct: false }, { option: '3', correct: false }, { option: '0', correct: true }]
      },
      {
        id: 10,
        question: "Whats 10+1?",
        options: [{ option: '2', correct: false }, { option: '11', correct: true }, { option: '3', correct: false }, { option: '0', correct: false }]
      }
    ],
    // currentQuestion: this.sessionStorageQuestionNumber(),
    current_answer: '',
    answers: this.sessionStoragegetAnswers() || {},
    currentQuestion: this.sessionStorageQuestionNumber() || 0,
    showReview: false
  }



  componentDidMount() {
    // console.log(this.state, 'initial')
  }

  componentDidUpdate() {
    // console.log(this.state, 'on update')
  }

  sessionStorageQuestionNumber() {
    if (window.sessionStorage.getItem('currentQuestion')) {
      return Number(window.sessionStorage.getItem('currentQuestion'))
    } else {
      window.sessionStorage.setItem('currentQuestion', 0);
      return 0
    }
  }

  sessionStoragegetAnswers() {
    if (window.sessionStorage.getItem('answers')) {
      return JSON.parse(window.sessionStorage.getItem('answers'))
    } else {
      window.sessionStorage.setItem('answers', JSON.stringify({}));
      return {}
    }
  }

  handleSubmit(e) {
    // alert('A name was submitted: ' + this.state.value);
    e.preventDefault();
  }

  submitAns = () => {
    this.setState(prevState => ({
      answers: {
        ...prevState.answers,
        [this.state.questions[this.state.currentQuestion].id]: this.state.current_answer
      }
    }), () => {
      window.sessionStorage.setItem('answers', JSON.stringify(this.state.answers));
      // console.log(this.state.answers[this.state.questions[this.state.currentQuestion].id])
    })


  }

  setCurrentAnswer = (e) => {
    // console.log(e.target.value)
    let ans = e.target.value
    this.setState({ current_answer: ans })
  }

  nextQuestion = () => {
    if (this.state.currentQuestion < this.state.questions.length - 1) {
      this.setState({
        currentQuestion: this.state.currentQuestion + 1
      }, () => {
        window.sessionStorage.setItem('currentQuestion', this.state.currentQuestion);
        // this.currentQuestion += 1
        this.setAnswer()
        let question_area = document.getElementById('question-form')
        question_area.classList.add('slide-question-forward')
      })
    }

  }

  setAnswer = () => {
    // console.log(this.state.questions[this.state.currentQuestion], this.state.currentQuestion)
    if (!this.state.answers[this.state.questions[this.state.currentQuestion].id]) {
      this.setState({
        current_answer: '',
      })
    } else {
      this.setState({
        current_answer: this.state.answers[this.state.questions[this.state.currentQuestion].id],
      })
    }
  }

  prevQuestion = () => {
    if (this.state.currentQuestion > 0) {
      this.setState({
        currentQuestion: this.state.currentQuestion - 1
      }, () => {
        // this.currentQuestion -= 1
        let question_area = document.getElementById('question-form')
        question_area.classList.add('slide-question-reverse')
        window.sessionStorage.setItem('currentQuestion', this.state.currentQuestion);
        this.showReviewSection(false)
        this.setAnswer()
      })
    }

  }

  submitQuiz = () => {
    this.evaluateScore()
    this.setState({
      currentQuestion: 0,
      answers: {}
    }, () => {
      this.setAnswer()
      this.showReviewSection(false)
      window.sessionStorage.clear()
    })


  }

  evaluateScore = () => {
    let score = 0
    console.log('entered eval score', this.state);

    for (let i in this.state.answers) {
      for (let j of this.state.questions) {
        if (i == j.id) {
          for (let option of j.options) {
            console.log(option.option, this.state.answers[i], option.correct)
            if (option.option == this.state.answers[i] && option.correct === true) {
              // console.log(option.option,answers[i],option.correct)
              score += 1;
              break
            }
          }
        }
      }
    }
    window.alert(`You've scored ${score}/${this.state.questions.length}`)

  }

  showReviewSection = (bool) => {
    this.setState({
      showReview: bool
    })
  }

  clearAnswer = () => {
    let answers = Object.assign({}, this.state.answers)
    if (answers[this.state.questions[this.state.currentQuestion].id]) {
      delete answers[this.state.questions[this.state.currentQuestion].id]
    }

    // console.log("new answers", answers);
    this.setState({
      answers: answers
    }, () => {
      window.sessionStorage.setItem('answers', JSON.stringify(this.state.answers));
    })
  }

  render() {
    return (
      <div>
        <main>
          <h1>It's a Math Quiz</h1>
          <p>Question <span id="current-question-no">{this.state.currentQuestion + 1}</span>/<span id="total-questions">{this.state.questions.length}</span></p>
          <form onAnimationEnd={() => { document.getElementById('question-form').classList.remove('slide-question-forward', 'slide-question-reverse') }} onSubmit={this.handleSubmit} id="question-form">
            <p id="question">{this.state.questions[this.state.currentQuestion].question}</p>
            <div id="options">
              {this.state.questions[this.state.currentQuestion].options.map((option, index) => {
                let data = option.option;
                return (
                  <label htmlFor={data} key={index}>
                    <input type="radio" onChange={this.setCurrentAnswer} checked={this.state.answers[this.state.questions[this.state.currentQuestion].id] === data || this.state.current_answer === data} name={"question-option"} value={data} />
                    {data}
                    <br />
                  </label>
                );
              })
              }
            </div>
            <button onClick={this.prevQuestion} id="prevBtn">Previous</button>
            <button type="reset" id="clearBtn" onClick={this.clearAnswer}>Clear Selection</button>
            <button type="submit" id="submitBtn" onClick={this.submitAns}>Submit</button>
            {(this.state.currentQuestion === this.state.questions.length - 1) ? (<button onClick={() => this.showReviewSection(true)}
              disabled={!this.state.answers[this.state.questions[this.state.currentQuestion].id]}
              id="nextBtn">Review answers</button>) : (<button onClick={this.nextQuestion}
                disabled={!this.state.answers[this.state.questions[this.state.currentQuestion].id]}
                id="nextBtn">Next</button>)}

            <br />
            <button id="submitExamBtn" onClick={this.submitQuiz}>Submit Exam</button>
          </form>

          {this.state.showReview ? (<section id="review-section">
            <h1>Review Section</h1>
            <h2>Question:Your Answer</h2>
            <ol id="review-list">
              {this.state.questions.map(k => {
                let data = k
                return (
                  <li key={data.id}>{data.question}: {this.state.answers[data.id] || 'Not Answered'}</li>
                )
              })
              }
            </ol>
          </section>) : (<div></div>)}

        </main>
      </div>
    );
  }
}

export default App;
