import React, {useState, useEffect} from "react";
import DateTimePicker from 'react-datetime-picker';
import axios from "axios";

const Home = () => {
    const now = new Date();

    const [date, setDate] = useState(new Date());
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [schedules, setSchedules] = useState(
        [{
            title: "9 AM",
            available: true,
            value: 9
        },
            {
                title: "10 AM",
                available: true,
                value: 10
            },
            {
                title: "11 AM",
                available: true,
                value: 11
            },
            {
                title: "12 PM",
                available: true,
                value: 12
            }, {
            title: "13 PM",
            available: true,
            value: 13
        },
            {
                title: "14 PM",
                available: true,
                value: 14
            },
            {
                title: "15 PM",
                available: true,
                value: 15
            },
            {
                title: "16 PM",
                available: true,
                value: 16
            },
            {
                title: "17 PM",
                available: true,
                value: 17
            }]);

    useEffect(() => {
        getSchedules();
    }, [date, schedules]);

    const handleOnClick = async () => {
        try {
            const formatDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`;
            const startTime = date.getHours();
            const data = {
                email,
                date,
                formatDate,
                startTime
            }
            const res = await axios.post("/api/appointments", data);
            console.log(res.data);
        } catch (e) {
            console.log("Error", e);
        }
    };

    const getSchedules = async () => {
        try {
            const formatDate = `${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`;
            const res = await axios.get(`/api/appointments/${formatDate}`);
            const appointments = res.data;

            if (appointments.length > 0) {
                appointments.map(a => {
                    setSchedules(schedules.map(s => {
                        if (a.startTime === s.value) {
                            return {...s, available: false}
                        }

                        return s;
                    }))
                });
            }
        } catch (e) {
            console.log("Error", e);
        }
    };

    const renderSchedules = () => {
        return (
            <div style={styles.schedulesContainer}>
                <label style={styles.label}>Available Schedules</label>
                {schedules.map((schedule, index) => <button
                    key={index}
                    style={{...styles.scheduleButton, backgroundColor: schedule.available ? "green" : "red"}}
                    disabled={!schedule.available}
                    onClick={() => handleScheduleClick(schedule.value)}>
                    {schedule.title}
                </button>)}
            </div>
        );
    };

    const handleScheduleClick = hour => {
        const selectedHour = new Date(date.setHours(hour, 0, 0, 0));
        setDate(selectedHour);
    };

    const handleOnChange = value => {
        const hour = value.getHours();
        const day = value.getDay();

        if (hour >= 9 && hour < 18) {
            if (day >= 1 && day <= 5) {
                setDate(value);
                setError("");
            } else {
                setError("You can only select days of the week.");
                setDisabled(true);
            }
        } else {
            setError("You must select a time between 9am to 5pm.");
            setDisabled(true);
        }
    };

    const handleOnChangeText = e => {
        const text = e.target.value;

        if (!text) {
            setError("You must write your email.")
            setEmail(text);
        } else {
            setError("Format email invalid.");
            setEmail(text);
            setDisabled(true);
            if (isValidEmail(text)) {
                setDisabled(false);
                setError("");
            }
        }
    };

    const isValidEmail = text => {
        return !!text.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    };

    return (
        <div style={styles.container}>
            <div style={styles.titleContainer}>
                <h1>Make your appointment to dance with "The Death"</h1>
                {error && <small style={styles.error}>{error}</small>}
            </div>
            <div style={{display: "flex"}}>
                <div style={styles.formGroup}>
                    <label style={styles.label}>Contact email</label>
                    <input
                        type="email"
                        placeholder="Add your email"
                        onChange={handleOnChangeText}
                        value={email}
                        required
                    />
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Add Your Date and Start time</label>
                        <DateTimePicker
                            onChange={handleOnChange}
                            value={date}
                            minDate={now}
                            disableClock={true}
                        />
                    </div>
                    <div style={styles.formGroup}>
                        <button
                            onClick={handleOnClick}
                            disabled={disabled}>
                            Make Appointment
                        </button>
                    </div>
                </div>
                {renderSchedules()}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    titleContainer: {
        marginBottom: 20,
        textAlign: "center"
    },
    error: {
        color: "red"
    },
    formGroup: {
        marginTop: 10,
        marginBottom: 10,
        display: "flex",
        flexDirection: "column"
    },
    schedulesContainer: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 10
    },
    label: {
        fontSize: 20,
        fontWeight: "bold"
    },
    scheduleButton: {
        color: "white",
        borderRadius: 20,
        fontSize: 16
    }
};

export default Home