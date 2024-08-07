import {useState} from "react";
import {calcData} from '../data/calcData.js'

const Calculator = () => {

  const [value, setValue] = useState('');
  const operations = ['+', '-', '*']

  const checkOnOperationSameness = (op) => {
    if (op.match(/[0-9]/g))
      setValue(value + op)

    let anyOperationExists = false
    operations.forEach((op) => {
      if (op === value.at(value.length - 1))
        anyOperationExists = true;
    })

    console.log(anyOperationExists)
    return !anyOperationExists && setValue(value + op)
  }

  const finalCalculation = () => {
    if (value.includes("=")) return;

    let allOperands = value.split(/[*+-]/g),
      allOperations = value.split(/[0-9]/g).filter((op) => op !== ''),
      result = Number.parseInt(allOperands[0], 10)

    console.log('-----------------------------------------------')
    for (let i = 1; i < allOperands.length; i++) {
      switch (allOperations[i - 1]) {
        case '+':
          result += Number.parseInt(allOperands[i], 10);
          break;
        case '-':
          result -= Number.parseInt(allOperands[i], 10);
          break;
        case '*':
          result *= Number.parseInt(allOperands[i], 10);
          break;
      }
    }
    console.log('-----------------------------------------------')
    setValue(value + '=' + result)
  }

  return (
    <div className={"bg-body-secondary bg-gradient"}>
      <div className={"container-lg container-fluid d-flex vh-100"}>
        <div className={"w-md-50 w-100 d-flex flex-column m-md-auto px-3 py-5 border border-2 border-black rounded-4"}
             style={{boxShadow: '4px 4px black'}}>
          <div className={"text-center mb-4"}>
            <h3 className={"fw-bold"} style={{textShadow: '2px 2px gray'}}>
              C A L C U L A T O R
            </h3>
          </div>
          <div className={"d-flex justify-content-end align-items-end border border-black px-4 py-3"}
               style={{minHeight: '100px'}}>
            <div>
              <span className={"h5 m-0"}>
                {value}
              </span>
            </div>
          </div>
          <div className={"row g-0"}>
            <div className={"col"}>
              <button className={"btn btn-outline-dark rounded-0 w-100 p-3"}
                      onClick={() => setValue('')}>
                CA
              </button>
            </div>
            <div className={"col"}>
              <button className={"btn btn-outline-dark rounded-0 w-100 p-3"}
                      onClick={() => setValue((prev) => {
                        return prev.includes('=') ?
                          value.substring(0, value.lastIndexOf('=')) :
                          value.substring(0, value.length - 1)
                      })}>
                C
              </button>
            </div>
          </div>
          <div className={"row g-0"}>
            {calcData.map((operand, index) => (
              <div key={index} className={'col-3'}>
                <button className={"btn btn-outline-dark rounded-0 w-100 p-3"}
                        onClick={() => checkOnOperationSameness(operand)}>
                  {operand}
                </button>
              </div>
            ))}
          </div>
          <div className={"row g-0"}>
            <div className={"col-9"}>
              <button className={"btn btn-outline-dark rounded-0 w-100 p-3"}
                      onClick={() => setValue(value + '0')}>
                0
              </button>
            </div>
            <div className={"col-3"}>
              <button className={"btn btn-outline-dark rounded-0 w-100 p-3"}
                      onClick={() => finalCalculation()}>
                =
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator;