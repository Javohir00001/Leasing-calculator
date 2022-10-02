import { useState} from 'react';
import './normolize.css';
import './Base.css'
import './App.css';
import Cost from './Cost/Cost';

function App() {
  var data = {};
  const [inptBLock, setInptBLock] = useState(false)
  const [state, setState] = useState({
    price: "1000000",
    initial: "10",   
    month: "1",   
  });
  let paymentMonthly = Math.floor(((+state.price) - (+state.initial)) * ((0.035 * Math.pow((1 + 0.035), (+state.month))) / (Math.pow((1 + 0.035), (+state.month)) - 1))),
      leaseAmount = (+state.initial) + (+state.month) * paymentMonthly;
  
  function Price(cost) {
    setState({...state, price: cost})
  }
  function Initial(cost) {
    setState({...state, initial: cost})
  }
  function Month(cost) {
    setState({...state, month: cost})
  }

  async function Submit(event) {
    event.preventDefault();
    setInptBLock(true)
    data = {...state};
    data.paymentMonthly = paymentMonthly;
    data.leaseAmount = leaseAmount;
    const response = await fetch('https://eoj3r7f3r4ef6v4.m.pipedream.net', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application.json'
      }
    });
    const rspData = await response.json();
    console.log(rspData);
  }  
  return (
    <div className="calc">
      <div className="container">
        <h1 className="calc__title">
          Рассчитайте стоимость автомобиля в лизинг
        </h1>
        <form onSubmit={Submit}>
          <div className='calc__inputs'>
            <Cost name="price" label="Стоимость автомобиля" rangeMin="1000000" rangeMax="6000000" Price={ Price } inptBLock={inptBLock}/>
            <Cost name="initial" label="Первоначальный взнос" rangeMin="10" rangeMax="60" state={state} Initial={ Initial } inptBLock={inptBLock}/>
            <Cost name="month" label="Срок лизинга" rangeMin="1" rangeMax="60" Month={ Month } inptBLock={inptBLock}/>
          </div>
          <div className='calc__result'>
            <div>
              <label className='text-label'>
                Сумма договора лизинга
              </label>
              <h3>{leaseAmount + " ₽"}</h3>
            </div>
            <div>
              <label className='text-label'>
                Сумма договора лизинга
              </label>
              <h3>{paymentMonthly + " ₽"}</h3>
            </div>
            <div>
              <button type='submit' className={inptBLock ? 'active' : ''}>Оставить заявку</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
