import React, { useState } from 'react';
import { ArrowRightIcon, Loader2 } from 'lucide-react';
export function App({ locale = 'en' }: { locale?: 'en' | 'zh-TW' | 'ms' }) {
  const ui = {
    title: locale === 'zh-TW' ? '哆啦A夢翻譯蒟蒻' : locale === 'ms' ? 'Doraemon Translation Gummy' : 'Doraemon Translation Gummy',
    subtitleSlangToEn: locale === 'zh-TW' ? '將 Z 世代俚語翻成易懂中文！' : locale === 'ms' ? 'Terjemah Slanga Gen Z kepada Bahasa Melayu!' : 'Translate Gen Z Slang to Plain English!',
    subtitleEnToSlang: locale === 'zh-TW' ? '把一般中文轉成 Z 世代俚語！' : locale === 'ms' ? 'Tukar Bahasa Melayu kepada Slanga Gen Z!' : 'Convert Plain English to Gen Z Slang!',
    toggleLeft: locale === 'zh-TW' ? '俚語 → 中文' : locale === 'ms' ? 'Slanga → Bahasa Melayu' : 'Slang to English',
    toggleRight: locale === 'zh-TW' ? '中文 → 俚語' : locale === 'ms' ? 'Bahasa Melayu → Slanga' : 'English to Slang',
    inputLabelSlang: locale === 'zh-TW' ? 'Z 世代俚語輸入' : locale === 'ms' ? 'Input Slanga Gen Z' : 'Gen Z Slang Input',
    inputLabelEn: locale === 'zh-TW' ? '一般中文輸入' : locale === 'ms' ? 'Input Bahasa Melayu' : 'Plain English Input',
    inputPlaceholderSlang:
      locale === 'zh-TW'
        ? "請輸入 Z 世代俚語...（例如：'好牛，显眼包,delulu'）"
        : locale === 'ms'
        ? "Taip slanga Gen Z di sini... (cth: 'x pe, ')"
        : "Type your Gen Z slang here... (e.g., 'no cap, that's bussin fr fr')",
    inputPlaceholderEn:
      locale === 'zh-TW'
        ? "請輸入一般中文...（例如：'這真的很酷很厲害'）"
        : locale === 'ms'
        ? "Taip Bahasa Melayu di sini... (cth: 'Itu sangat hebat dan menakjubkan')"
        : "Type your plain English here... (e.g., 'That's really cool and amazing')",
    outputLabelSlang: locale === 'zh-TW' ? 'Z 世代俚語翻譯' : locale === 'ms' ? 'Terjemahan Slanga Gen Z' : 'Gen Z Slang Translation',
    outputLabelEn: locale === 'zh-TW' ? '一般中文翻譯' : locale === 'ms' ? 'Terjemahan Bahasa Melayu' : 'Plain English Translation',
    outputPlaceholder: locale === 'zh-TW' ? '翻譯結果將顯示在這裡…' : locale === 'ms' ? 'Terjemahan akan muncul di sini...' : 'Your translation will appear here...',
    btnTranslate: locale === 'zh-TW' ? '翻譯' : locale === 'ms' ? 'Terjemah' : 'Translate',
    btnTranslating: locale === 'zh-TW' ? '翻譯中…' : locale === 'ms' ? 'Menterjemah...' : 'Translating...',
    emptyInputMsgSlang: locale === 'zh-TW' ? '請先輸入 Z 世代俚語！' : locale === 'ms' ? 'Sila masukkan slanga Gen Z!' : 'Please enter some Gen Z slang to translate!',
    emptyInputMsgEn: locale === 'zh-TW' ? '請先輸入一般中文！' : locale === 'ms' ? 'Sila masukkan Bahasa Melayu!' : 'Please enter some plain English to convert!',
    genericError: locale === 'zh-TW' ? '抱歉，翻譯時發生錯誤，請再試一次。' : locale === 'ms' ? 'Maaf, berlaku ralat semasa menterjemah. Sila cuba lagi.' : 'Sorry, there was an error translating your text. Please try again.'
  };
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSlangToEnglish, setIsSlangToEnglish] = useState(true);
  const handleTranslate = async () => {
    if (!input.trim()) {
      setOutput(isSlangToEnglish ? ui.emptyInputMsgSlang : ui.emptyInputMsgEn);
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
              ? (locale === 'zh-TW'
                  ? '你是一個有用的翻譯助手，將 Z 世代俚語和網路用語轉換成清楚易懂的中文。首先提供翻譯，然後提供解釋讓人們理解俚語的意思。如果輸入包含多個俚語詞彙，請逐一解釋。要友善且資訊豐富。以 html 格式輸出，不要使用 markdown 前綴'
                  : locale === 'ms'
                  ? 'Anda adalah pembantu terjemahan yang berguna yang menukar slanga Gen Z dan bahasa internet kepada Bahasa Melayu yang jelas dan mudah difahami. Pertama berikan terjemahan, kemudian berikan penjelasan untuk membantu orang memahami maksud slanga. Jika input mengandungi beberapa istilah slanga, jelaskan setiap satu. Bersikap mesra dan informatif. Output dalam format html tanpa prefix markdown'
                  : 'You are a helpful translator that converts Gen Z slang and internet language into clear, plain English. First provide the translation. Then provide explanations that people to understand what the slang means. If the input contains multiple slang terms, explain each one. Be friendly and informative. Output in html format without markdown prefix')
              : (locale === 'zh-TW'
                  ? '你是一個有用的翻譯助手，將一般中文轉換成 Z 世代俚語和網路用語。首先直接提供俚語版本，不需要抬头 header。然後提供使用的俚語詞彙解釋。要富有創意且使用真實的 Z 世代俚語。要友善且資訊豐富。以 html 格式輸出，不要使用 markdown 前綴'
                  : locale === 'ms'
                  ? 'Anda adalah pembantu terjemahan yang berguna yang menukar Bahasa Melayu biasa kepada slanga Gen Z dan bahasa internet. Pertama berikan versi slanga secara langsung, tidak perlu header. Kemudian berikan penjelasan istilah slanga yang digunakan. Bersikap kreatif dan gunakan slanga Gen Z yang asli. Bersikap mesra dan informatif. Output dalam format html tanpa prefix markdown'
                  : 'You are a helpful translator that converts plain English into Gen Z slang and internet language. First provide the slang version. Then provide explanations of the slang terms used. Be creative and use authentic Gen Z slang. Be friendly and informative. Output in html format without markdown prefix')
          },
          {
            role: 'user',
            content: isSlangToEnglish
              ? (locale === 'zh-TW'
                  ? `將這個 Z 世代俚語翻譯成易懂的中文："${input}"`
                  : locale === 'ms'
                  ? `Terjemahkan slanga Gen Z ini kepada Bahasa Melayu yang mudah difahami: "${input}"`
                  : `Translate this Gen Z slang to plain English: "${input}"`)
              : (locale === 'zh-TW'
                  ? `將這個一般中文轉換成 Z 世代俚語："${input}"`
                  : locale === 'ms'
                  ? `Tukar Bahasa Melayu biasa ini kepada slanga Gen Z: "${input}"`
                  : `Convert this plain English to Gen Z slang: "${input}"`)
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
      const translation = data.choices[0]?.message?.content || (locale === 'zh-TW' ? '抱歉，我無法翻譯這段文字。' : locale === 'ms' ? 'Maaf, saya tidak dapat menterjemahkan teks ini.' : 'Sorry, I couldn\'t translate that.');
      setOutput(translation);
    } catch (error) {
      console.error('Translation error:', error);
      setOutput(ui.genericError);
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
            <h1 className="text-4xl font-bold">{ui.title}</h1>
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full" />
              </div>
            </div>
          </div>
          <p className="text-center mt-2 text-blue-100">
            {isSlangToEnglish ? ui.subtitleSlangToEn : ui.subtitleEnToSlang}
          </p>
          {/* Translation mode toggle */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className={`text-sm font-medium ${!isSlangToEnglish ? 'text-blue-200' : 'text-white'}`}>
              {ui.toggleLeft}
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
              {ui.toggleRight}
            </span>
          </div>
        </div>
        {/* Main translator area */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-0 p-8">
          {/* Left side - Input */}
          <div className="flex flex-col gap-4 pr-0 md:pr-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg border-4 border-blue-400">
              <label className="block text-lg font-bold text-blue-600 mb-2">
                {isSlangToEnglish ? ui.inputLabelSlang : ui.inputLabelEn}
              </label>
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={isSlangToEnglish ? ui.inputPlaceholderSlang : ui.inputPlaceholderEn}
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
                {isSlangToEnglish ? ui.outputLabelEn : ui.outputLabelSlang}
              </label>
              <div
                className="w-full h-64 p-4 border-2 border-yellow-300 rounded-xl bg-yellow-50 text-gray-800 overflow-y-auto [&_p]:mb-5"
                dangerouslySetInnerHTML={{
                  __html: output || ui.outputPlaceholder
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
              <>{ui.btnTranslating}</>
            ) : (
              <>
                {ui.btnTranslate} <ArrowRightIcon className="w-6 h-6" />
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
