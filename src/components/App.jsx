import {useState, useEffect} from 'react'
import DescriptionComponent from "./Description/Description.jsx";
import Options from "./Options/Options.jsx";
import Feedback from "./Feedback/Feedback.jsx";
import Notification from "./Notification/Notification.jsx";
import css from '../styles.module.css'


const title = 'Sip Happens Café'
const description = 'Please leave your feedback about our service by selecting one of the options below.'

const App = () => {
    const [feedback, setFeedback] = useState(() => {
        const feedbackOptions = JSON.parse(localStorage.getItem('feedback'))

        if(feedbackOptions !== null){
            return feedbackOptions;
        }

        return {
            good: 0,
            bad:0,
            neutral:0,
        }
    })

    const [totalFeedback, setTotalFeedback] = useState(0)
    const [positiveFeedback, setPositiveFeedback] = useState(0)

    useEffect(() => {
        setTotalFeedback(feedback.good + feedback.bad + feedback.neutral)

        localStorage.setItem('feedback', JSON.stringify(feedback))
    }, [feedback.good, feedback.bad, feedback.neutral])

    useEffect(() => {
        setPositiveFeedback(Math.round((feedback.good / totalFeedback) * 100))
    }, [totalFeedback])

    const UpdateFeedback = (feedbackType) => {
        setFeedback({...feedback, [feedbackType]: feedback[feedbackType] + 1})
    }

    const resetFeedback = () => {
        setFeedback({good:0,bad:0,neutral:0,})
    }
    return (
        <div className={css.container}>
            <DescriptionComponent title={title} description={description} />
            <Options options={feedback} UpdateFeedback={UpdateFeedback} reset={resetFeedback} totalFeedback={totalFeedback}/>
            {totalFeedback > 0 ? <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback}/> : <Notification>No feedback yet</Notification>}
        </div>
    )
}

export default App
