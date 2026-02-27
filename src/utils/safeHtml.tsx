import React from 'react';

/**
 * Safely renders a string containing only <strong> tags as React elements.
 * Rejects any other HTML to prevent XSS vulnerabilities.
 */
export const SafeDescription = ({ text }: { text: string }) => {
    const parts = text.split(/(<strong>.*?<\/strong>)/g);

    return (
        <>
            {parts.map((part, idx) => {
                const match = part.match(/^<strong>(.*?)<\/strong>$/);
                if (match) {
                    return <strong key={idx}>{match[1]}</strong>;
                }
                return <React.Fragment key={idx}>{part}</React.Fragment>;
            })}
        </>
    );
};
