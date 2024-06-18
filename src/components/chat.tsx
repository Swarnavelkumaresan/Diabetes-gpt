"use client";

import { useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import { Input } from './ui/input';
import { ScrollArea } from "./ui/scroll-area";
import { Avatar } from "./ui/avatar";
import { SendHorizonalIcon } from "lucide-react";
import { Button } from "./ui/button";
import CopyToClipboard from "./copy-to-clipboard";
import { FaUserDoctor } from "react-icons/fa6";

export default function Chat() {
    const ref = useRef<HTMLDivElement>(null);
    const { messages, input, setInput, handleInputChange, handleSubmit, isLoading, error } = useChat();
    const [hasInput, setHasInput] = useState(false);

    useEffect(() => {
        if (ref.current === null) return;
        ref.current.scrollTo(0, ref.current.scrollHeight);
    }, [messages]);

    useEffect(() => {
        setHasInput(messages.length > 0);
    }, [messages]);

    const isDiabetesQuery = (query: string) => {
        const diabetesKeywords = ['hi', 'diabetes', 'blood sugar', 'insulin', 'glucose'];
        return diabetesKeywords.some(keyword => query.toLowerCase().includes(keyword));
    };

    const handleCustomSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (isDiabetesQuery(input)) {
            await handleSubmit(e);
            setInput('');
        } else {
            alert('Please ask a question related to diabetes.');
            setInput('');  
        }
    };

    return (
        <section className="p-16 ">
            <div className="my-container p-4">
                <h1 className={`my-text-class text-center ${hasInput ? 'fade-out' : ''}`}>
                    <span className="my-gradient-text">
                        Hello, Dude
                    </span>{' '}
                    <br />
                    <span className="text-gray-300 mt-5 text-2xl md:text-4xl lg:text-5xl">
                        How can I help you today?
                    </span>
                </h1>
                <div className="custom-container">
                    <ScrollArea className="custom-scroll-area" ref={ref}>
                        {error && (
                            <div className="custom-error-message">{error.message}</div>
                        )}
                        {messages.map(m => (
                            <div key={m.id} className="custom-message">
                                {m.role === 'user' && (
                                    <div className="custom-message-container">
                                        <div style={{marginTop:"10px"}}>
                                            <p style={{fontSize:"17px", color: '#2b3d64', fontWeight: 800, marginBottom: '1rem'}}>
                                                {m.content}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                {m.role === 'assistant' && (
                                    <div className="custom-assistant-message-container">
                                        <Avatar>
                                            <FaUserDoctor />
                                        </Avatar>
                                        <div className='custom-message-content'>
                                            <div className="custom-flex-container">
                                                <div className="custom-text">
                                                    {m.content}
                                                </div>
                                                <CopyToClipboard message={m} className='custom-margin' />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </ScrollArea>
                    <form onSubmit={handleCustomSubmit} className="custom-form">
                        <Input 
                            value={input} 
                            onChange={handleInputChange} 
                            placeholder='Ask me about Diabetes...' 
                            className='custom-input'
                        />
                        <Button 
                            size='icon' 
                            type='submit' 
                            variant='secondary' 
                            disabled={isLoading} 
                            className='custom-button'
                        >
                            <SendHorizonalIcon className="custom-icon" />
                        </Button>
                    </form>
                </div>
            </div>
        </section>
    );
}
