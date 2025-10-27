import React, { useState } from 'react';
import { ArrowRightIcon, Loader2 } from 'lucide-react';
export function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSlangToEnglish, setIsSlangToEnglish] = useState(true);
  const handleTranslate = async () => {
    if (!input.trim()) {
      setOutput(isSlangToEnglish ? 'Please enter some Gen Z slang to translate!' : 'Please enter some plain English to convert!');
      return;
    }

    setIsLoading(true);
    setOutput('');

    try {
      const requestBody = {
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: isSlangToEnglish
              ? 'You are a helpful translator that converts Gen Z slang and internet language into clear, plain English. First provide the translation. Then provide explanations that people to understand what the slang means. If the input contains multiple slang terms, explain each one. Be friendly and informative. Output in html format without markdown prefix'
              : 'You are a helpful translator that converts plain English into Gen Z slang and internet language. First provide the slang version. Then provide explanations of the slang terms used. Be creative and use authentic Gen Z slang. Be friendly and informative. Output in html format without markdown prefix'
          },
          {
            role: 'user',
            content: isSlangToEnglish
              ? `Translate this Gen Z slang to plain English: "${input}"`
              : `Convert this plain English to Gen Z slang: "${input}"`
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      };

      console.log('Making API request with body:', JSON.stringify(requestBody, null, 2));

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);
        console.log('Error response body:', errorText);
        throw new Error(`API request failed: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const translation = data.choices[0]?.message?.content || 'Sorry, I couldn\'t translate that.';
      setOutput(translation);
    } catch (error) {
      console.error('Translation error:', error);
      setOutput('Sorry, there was an error translating your text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return <div className="w-full min-h-screen flex items-center justify-center p-8" style={{
    background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE4B5 50%, #F5DEB3 100%)'
  }}>
      {/* Toast-shaped container */}
      <div className="relative w-full max-w-6xl rounded-[3rem] shadow-2xl overflow-hidden" style={{
      background: 'linear-gradient(to bottom, #FFE4B5 0%, #F5DEB3 50%, #DEB887 100%)',
      border: '8px solid #D2691E'
    }}>
        {/* Toast crust texture overlay */}
        <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, transparent 2px, rgba(139, 69, 19, 0.3) 2px, transparent 3px), radial-gradient(circle at 60% 70%, transparent 2px, rgba(139, 69, 19, 0.3) 2px, transparent 3px), radial-gradient(circle at 80% 20%, transparent 2px, rgba(139, 69, 19, 0.3) 2px, transparent 3px)',
        backgroundSize: '100px 100px'
      }} />
        {/* Doraemon header */}
        <div className="relative bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-center gap-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
            </div>
            <h1 className="text-4xl font-bold">Doraemon Translation Gummy</h1>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
            </div>
          </div>
          <p className="text-center mt-2 text-blue-100">
            {isSlangToEnglish ? 'Translate Gen Z Slang to Plain English!' : 'Convert Plain English to Gen Z Slang!'}
          </p>
          {/* Translation mode toggle */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className={`text-sm font-medium ${!isSlangToEnglish ? 'text-blue-200' : 'text-white'}`}>
              English to Slang
            </span>
            <button
              onClick={() => setIsSlangToEnglish(!isSlangToEnglish)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ${
                isSlangToEnglish ? 'bg-blue-400' : 'bg-blue-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isSlangToEnglish ? 'translate-x-1' : 'translate-x-6'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isSlangToEnglish ? 'text-blue-200' : 'text-white'}`}>
              Slang to English
            </span>
          </div>
        </div>
        {/* Main translator area */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 p-8">
          {/* Left side - Input */}
          <div className="flex flex-col gap-4 pr-0 md:pr-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-blue-400">
              <label className="block text-lg font-bold text-blue-600 mb-2">
                {isSlangToEnglish ? 'Gen Z Slang Input' : 'Plain English Input'}
              </label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isSlangToEnglish
                  ? "Type your Gen Z slang here... (e.g., 'no cap, that's bussin fr fr')"
                  : "Type your plain English here... (e.g., 'That's really cool and amazing')"
                }
                className="w-full h-64 p-4 border-2 border-blue-300 rounded-xl resize-none focus:outline-none focus:border-blue-500 text-gray-800"
              />
            </div>
          </div>
          {/* Doraemon's pocket divider */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10">
            <div className="w-20 h-20 bg-white rounded-full shadow-2xl border-4 border-blue-500 flex items-center justify-center overflow-hidden">
              <img
                src="/images/doraemon.png"
                alt="Doraemon"
                className={`w-full h-full object-cover rounded-full transition-transform duration-300 ${
                  isLoading ? 'animate-spin' : ''
                }`}
              />
            </div>
          </div>
          {/* Right side - Output */}
          <div className="flex flex-col gap-4 pl-0 md:pl-4 mt-8 md:mt-0">
            <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-yellow-400">
              <label className="block text-lg font-bold text-yellow-600 mb-2">
                {isSlangToEnglish ? 'Plain English Translation' : 'Gen Z Slang Translation'}
              </label>
              <div
                className="w-full h-64 p-4 border-2 border-yellow-300 rounded-xl bg-yellow-50 text-gray-800 overflow-y-auto [&_p]:mb-5"
                dangerouslySetInnerHTML={{
                  __html: output || 'Your translation will appear here...'
                }}
              />
            </div>
          </div>
        </div>
        {/* Translate button spanning both columns */}
        <div className="px-8 pb-4">
          <button
            onClick={handleTranslate}
            disabled={isLoading}
            className={`w-full px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-3 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-xl transform hover:scale-105'
            } text-white`}
          >
            {isLoading ? (
              <>Translating...</>
            ) : (
              <>
                Translate <ArrowRightIcon className="w-6 h-6" />
              </>
            )}
          </button>
        </div>
        {/* Doraemon footer decoration */}
        <div className="relative bg-gradient-to-r from-red-500 to-red-600 p-4">
          <div className="flex justify-center gap-8">
            <div className="w-12 h-12 bg-yellow-400 rounded-full shadow-lg" />
            <div className="w-12 h-12 bg-blue-500 rounded-full shadow-lg" />
            <div className="w-12 h-12 bg-red-500 rounded-full shadow-lg" />
          </div>
        </div>
      </div>
    </div>;
}
