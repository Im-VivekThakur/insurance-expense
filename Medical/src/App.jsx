import React from 'react'
import './App.css'
import { CircularProgress, MenuItem, Select, Slider, Switch } from '@mui/material'

const regionValues = [0, 0, 0, 0]
const initialValues = {
  age: 20,
  gender: false,
  weight: 60,
  height: 150,
  children: 0,
  smoker: false,
  region: 0
}

function App() {

  const [values, setValues] = React.useState(initialValues);
  const [loading, setLoading] = React.useState(false);
  const [output, setOutput] = React.useState("");

  const callApi = () => {
    setLoading(true)
    const data = {
      ...values,
      height: values.height / 100,
      region: regionValues.map((item, idx) => idx === values.region ? 1 : 0)
    }
    fetch(`https://medical-hoe8.onrender.com/expense/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(res => {
        if (res.status === 201) {
          // setValues(initialValues);
          setLoading(false);
        }
        else {
          throw Error("Something went wrong")
        }
        return res.json();
      })
      .then(data => setOutput(data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }

  return (
    <div className="w-[100%] min-h-[100vh] flex flex-col items-center p-8 gap-4 md:gap-8 bg-slate-200">
      <div className="w-[100%] md:w-[45%] flex flex-col items-center gap-4 p-4 px-8 shadow-md rounded-md">
        <div className="text-4xl  font-['DM_SANS'] font-bold opacity-70 tracking-widest">Medical Expense Predictor</div>
        <div className="text-sm text-center font-['DM_SANS'] font-bold opacity-70 tracking-widest">A linear regression model that predicts the medical bill an individual may have to sustain</div>
      </div>
      <div className="w-[100%] md:w-[45%] flex flex-col items-center gap-4 p-4 px-8 shadow-md rounded-md">
        <div className="text-4xl font-['DM_SANS'] font-bold opacity-70 tracking-widest">Health Indexing</div>
        {output !== "" && <div className="text-3xl text-[var(--base-theme)] font-['DM_SANS'] font-bold opacity-70 tracking-widest">${output.expense}</div>}
        <div className="my-4 text-lg flex items-center w-[75%] justify-between">
          <div className="font-['DM_Sans']">Age</div>
          <Slider
            sx={{
              color: "var(--base-theme)", //color of the slider between thumbs
              "& .MuiSlider-thumb": {
                backgroundColor: "var(--base-theme)" //color of thumbs
              },
              "& .MuiSlider-rail": {
                color: "var(--base-theme)" ////color of the slider outside  teh area between thumbs
              }
            }}
            defaultValue={20}
            aria-label="Small"
            valueLabelDisplay="auto"
            className='!w-[60%]'
            min={2}
            max={120}
            value={values.age}
            onChange={e => {
              setValues(old => ({ ...old, age: e.target.value }))
            }}
          />
        </div>
        <div className="my-4 text-lg flex items-center w-[75%] justify-between">
          <div className="font-['DM_Sans']">Weight</div>
          <Slider
            sx={{
              color: "var(--base-theme)", //color of the slider between thumbs
              "& .MuiSlider-thumb": {
                backgroundColor: "var(--base-theme)" //color of thumbs
              },
              "& .MuiSlider-rail": {
                color: "var(--base-theme)" ////color of the slider outside  teh area between thumbs
              }
            }}
            aria-label="Small"
            valueLabelDisplay="auto"
            className='!w-[60%]'
            min={5}
            max={200}
            value={values.weight}
            onChange={e => {
              setValues(old => ({ ...old, weight: e.target.value }))
            }}
          />
        </div>
        <div className="my-4 text-lg flex items-center w-[75%] justify-between">
          <div className="font-['DM_Sans']">Children</div>
          <Slider
            sx={{
              color: "var(--base-theme)", //color of the slider between thumbs
              "& .MuiSlider-thumb": {
                backgroundColor: "var(--base-theme)" //color of thumbs
              },
              "& .MuiSlider-rail": {
                color: "var(--base-theme)" ////color of the slider outside  teh area between thumbs
              }
            }}
            aria-label="Small"
            valueLabelDisplay="auto"
            className='!w-[60%]'
            min={0}
            max={10}
            value={values.children}
            onChange={e => {
              setValues(old => ({ ...old, children: e.target.value }))
            }}
          />
        </div>
        <div className="my-4 text-lg flex items-center w-[75%] justify-between">
          <div className="font-['DM_Sans']">Height(cm)</div>
          <Slider
            sx={{
              color: "var(--base-theme)", //color of the slider between thumbs
              "& .MuiSlider-thumb": {
                backgroundColor: "var(--base-theme)" //color of thumbs
              },
              "& .MuiSlider-rail": {
                color: "var(--base-theme)" ////color of the slider outside  teh area between thumbs
              }
            }}
            aria-label="Small"
            valueLabelDisplay="auto"
            className='!w-[60%]'
            min={50}
            max={250}
            value={values.height}
            onChange={e => {
              setValues(old => ({ ...old, height: e.target.value }))
            }}
          />
        </div>
        <div className="my-4 text-lg flex items-center w-[75%] justify-between">
          <div className="font-['DM_Sans']">Location</div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={values.region}
            onChange={e => setValues(old => ({ ...old, region: e.target.value }))}
            label="Region"
            placeholder='Region'
          >
            <MenuItem value={0}>NorthEast</MenuItem>
            <MenuItem value={1}>NorthWest</MenuItem>
            <MenuItem value={2}>SouthEast</MenuItem>
            <MenuItem value={3}>SouthWest</MenuItem>
          </Select>
        </div>
        <div className="my-4 text-lg flex items-center w-[100%] justify-evenly">
          <div className="my-4 text-lg flex items-center">
            <div className="font-['DM_Sans']">Female</div>
            <Switch

              checked={values.gender}
              onChange={e => setValues(old => ({ ...old, gender: e.target.checked }))}
            />
            <div className="font-['DM_Sans']">Male</div>
          </div>
          <div className="my-4 text-lg flex items-center">
            <div className="font-['DM_Sans']">Smoker</div>
            <Switch

              checked={values.smoker}
              onChange={e => setValues(old => ({ ...old, smoker: e.target.checked }))}
            />
          </div>
        </div>
        <div className="mb-8 text-lg flex items-center">
          <div className="font-['DM_Sans'] text-lg px-4 py-2 rounded-lg text-white font-bold bg-[var(--base-theme)] tracking-widest cursor-pointer flex item-center"
            onClick={() => callApi()}
          >{!loading ? <span>Submit</span> : <CircularProgress color="inherit" className='!w-[25px] !h-[25px]' />}</div>
        </div>
      </div>
    </div>
  )
}

export default App
