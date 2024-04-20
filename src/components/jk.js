
import React, { useState, useEffect } from "react";
import "./dash.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCopy, faCheck, faDownload, faPaperPlane, faSpinner} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Acourt = () => {
    const [loading, setLoading] = useState(false);
    const [textInput, setTextInput] = useState("");
    const [fileInput, setFileInput] = useState(null);
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const [messages, setMessages] = useState([]);
    const [sendDisabled, setSendDisabled] = useState(true);

    useEffect(() => {
        setSendDisabled(textInput.trim() === "" && !fileInput);
    }, [textInput, fileInput]);
const handleDownload = async ({ pdfFilename }) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `http://127.0.0.1:8000/download_pdf/${pdfFilename}`,
                { responseType: "blob" }
            );
            const blob = new Blob([response.data], { type: "application/pdf" });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", pdfFilename);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
            setLoading(false);
        } catch (error) {
            console.error("Error downloading PDF:", error);
            setLoading(false);
        }
    };
    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            if (!textInput.trim() && !fileInput) {
                console.log("Please enter a message or upload a file.");
                return;
            }
            setLoading(true);

            const newMessages = [...messages];
            newMessages.push({ sender: "user", message: textInput, copied: false });
            setMessages(newMessages);

            const formData = new FormData();
            formData.append("text", textInput);

            if (fileInput) {
                formData.append("image", fileInput);
            }
            const response = await fetch("http://127.0.0.1:8000/Rotary_bot", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            if (data.text) {
                newMessages.push({ sender: "bot", message: data.text, copied: false });
            } else if (data.pdf) {
                const pdfFilename = data.pdf;

                newMessages.push({
                    sender: "bot",
                    message: (
                        <div>

                            <button className="download" onClick={() => handleDownload({ pdfFilename })}>
                                <FontAwesomeIcon icon={faDownload} /> Download pdf
                            </button>
                        </div>
                    ),
                    copied: false,
                });
            } else if (data.image) {
                newMessages.push({
                    sender: "bot",
                    message: <img src={data.image} alt="img" />,
                    copied: false,
                });
            }

            setMessages(newMessages);
            setTextInput("");
            setFileInput(null);
            setPreviewImageUrl(null);
            setLoading(false);
        } catch (error) {
            console.error("Error:", error);
            setLoading(false);
        }
    };

 

 const copyMessage = (message, index) => {
        navigator.clipboard.writeText(message);
        const newMessages = [...messages];
        newMessages[index].copied = true;
        setMessages(newMessages);
    };
 return (
        <>
            <div className="container">
             
             <div className="row">              
             <div className="col-12">
                    <div className="chat1">
                        <div className="messages-container">
                            {messages.map((message, index) => {
                                if (message.sender === "bot") {
                                    const consecutiveBotMessages = [message];
                                    let nextIndex = index + 1;
                                    while (
                                        nextIndex < messages.length &&
                                        messages[nextIndex].sender === "bot"
                                    ) {
                                        consecutiveBotMessages.push(messages[nextIndex]);
                                        nextIndex++;
                                    }
                                    return (
                                        <div key={index} className="message-container">
                                            {consecutiveBotMessages.map((msg, i) => (
                                                <div key={i} className={`message ${msg.sender}`}>
                                                    {typeof msg.message === "string"
                                                        ? msg.message
                                                        : msg.message}
                                                    {msg.sender === "bot" &&
                                                        typeof msg.message === "string" &&
                                                        !msg.copied && (
                                                            <FontAwesomeIcon
                                                                icon={faCopy}
                                                                className="icon-copy1"
                                                                onClick={() =>
                                                                    copyMessage(msg.message, index + i)
                                                                }
                                                            />
                                                        )}
                                                    {msg.sender === "bot" &&
                                                        typeof msg.message === "string" &&
                                                        msg.copied && (
                                                            <FontAwesomeIcon
                                                                icon={faCheck}
                                                                className="icon-copy1"
                                                            />
                                                        )}
                                                </div>
                                            ))}
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index} className={`message ${message.sender}`}>
                                            {typeof message.message === "string"
                                                ? message.message
                                                : message.message}
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                    <div className="p-5">
                        <form onSubmit={sendMessage} className="message-form">
                            {previewImageUrl && (
                                <div className="image-preview">
                                    <img src={previewImageUrl} alt="Preview" />
                                </div>
                            )}
                            <textarea
                                value={textInput}
                                onChange={(e) => setTextInput(e.target.value)}
                                placeholder="Enter text message"
                            ></textarea>
                           
                            <button
                                type="submit"
                                className="message-button"
                                disabled={sendDisabled || loading}
                            >
                                {loading ? (
                                    <FontAwesomeIcon icon={faSpinner} className="icon-sent2" spin />
                                ) : (
                                    <FontAwesomeIcon icon={faPaperPlane} className="icon-sent1" />
                                )}
                            </button>
                        </form>
                    </div>
                </div></div>
            </div></>
    );
};


export default Acourt;