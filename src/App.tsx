import { useState } from "react";
import CryptoEs from 'crypto-es';
import CopyIcon from './assets/copy.svg';
import { useCopyToClipboard } from "usehooks-ts";
import keyClose from './assets/key-close.svg';
import keyOpen from './assets/key-open.svg';
import "./App.css";

function App() {

  const [texto, setTexto] = useState('');
  const [encriptText, setEncriptText] = useState('');
  const [copedText, copy] = useCopyToClipboard();
  const [padlockImg, setPadlockImg] = useState('/src/assets/padlock-close.png');
  const [keyState, setKeyState] = useState(true);
  const [btnDisable, setBtnDisable] = useState(false);  

  const handleKeyStatus = (): void => {
    setKeyState(!keyState);
    setPadlockImg(keyState ? '/src/assets/padlock-open.png' : '/src/assets/padlock-close.png')
    setBtnDisable(keyState);
    setEncriptText('');
  }
  
  const handleCopy = (text: string) => () => {
    copy(text).then(() => {      
      if(text.trim().length > 0){
        alert(`Texto Copiado al portapapeles: ${text}`);        
      }
    }).catch(err => console.error(err));
  }

  const handleEncriptAES = (): void => {
    const key = "kajsdhgeuwbjkbfckjsdbfkjKJHGDKFKSDJHGJKHBKJ324897DSFSLK;:;";
    if(texto.trim().length > 0){                  
      if (!keyState){
        setEncriptText(CryptoEs.AES.decrypt(texto, key).toString(CryptoEs.enc.Utf8));      
      }else {
        setEncriptText(CryptoEs.AES.encrypt(texto, key).toString());      
      }
    }

  }
  const handleEncriptMD5 = (): void => {
    if(texto.trim().length > 0){      
      setEncriptText(CryptoEs.MD5(texto).toString());
    }
  }
  const handleEncriptSHA256 = (): void => {
    if(texto.trim().length > 0){
      setEncriptText(CryptoEs.SHA256(texto).toString());
    }
  }
  const handleEncriptSHA512 = (): void => {
    if(texto.trim().length > 0){
      setEncriptText(CryptoEs.SHA512(texto).toString());
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if(texto.trim().length === 1){
      setEncriptText('');
    }
    setTexto(e.target.value);
  }


  return (
    <div className="container">
      <div className="padlock" style={{backgroundImage: `url(${padlockImg})`}}>
        <div>
          <button onClick={handleKeyStatus}><img src={keyState ? keyOpen : keyClose} alt="..." width={50} height={50}/></button>
          <input type="text" placeholder="INGRESE TEXTO" value={texto} onChange={handleTextChange} />
        </div>

        <div>
          <button onClick={handleEncriptAES}>AES</button>
          <button onClick={handleEncriptMD5} disabled={btnDisable}>MD5</button>
          <button onClick={handleEncriptSHA256} disabled={btnDisable}>SHA256</button>
          <button onClick={handleEncriptSHA512} disabled={btnDisable}>SHA512</button>
        </div>

        <div>
          <textarea className="resultado" cols={30} rows={6} value={encriptText} disabled></textarea>
          
          <button onClick={handleCopy(encriptText)}><img src={CopyIcon} alt="..."/></button>
        </div>
      </div>
    </div>
  );
}

export default App;
