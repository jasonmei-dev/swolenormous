import { useState } from 'react';
import { WORKOUTS, SCHEMES } from '../utils/swoldier';
import SectionWrapper from './SectionWrapper';
import Header from './Header';
import Button from './Button';

const Generator = ({ poison, setPoison, muscles, setMuscles, goal, setGoal, updateWorkout }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const updateMuscles = (muscleGroup) => {
    // remove muscleGroup from muscles if it's already in the array
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter((val) => val !== muscleGroup));
      return;
    }
    // Can't add more than 3 muscles to train
    if (muscles.length > 2) {
      return;
    }

    if (poison != 'individual') {
      setMuscles([muscleGroup]);
      setShowModal(false);
      return;
    }

    setMuscles([...muscles, muscleGroup]);
    if (muscles.length === 2) {
      setShowModal(false);
    }
  };

  return (
    <SectionWrapper header={'generate your workout'} title={["It's", 'Huge', "o'clock"]}>
      <Header index={'01'} title={'Pick your poision'} description={'Select the workout you want to endure.'} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Object.keys(WORKOUTS).map((type, typeIndex) => {
          return (
            <button
              onClick={() => {
                setPoison(type);
                setMuscles([]);
              }}
              className={'bg-slate-950 border border-blue-400 hover:border-blue-600 py-3 rounded-lg duraton-200 px-4 ' + (type === poison ? 'border-blue-600' : 'border-blue-400')}
              key={typeIndex}
            >
              <p className="capitalize">{type.replaceAll('_', ' ')}</p>
            </button>
          );
        })}
      </div>
      <Header index={'02'} title={'Lock on targets'} description={'Select the muscles judged for annihilation.'} />
      <div className="bg-slate-950 py-3 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button onClick={toggleModal} className="relative p-3 flex items-center justify-center">
          <p className="capitalize">{muscles.length === 0 ? 'Select muscle groups' : muscles.join(', ')}</p>
          <i className="fa-solid fa-caret-down absolute right-3 top-1/2 -translate-y-1/2"></i>
        </button>
        {showModal && (
          <div className="flex flex-col px-3 pb-3">
            {(poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
              return (
                <button
                  onClick={() => {
                    updateMuscles(muscleGroup);
                  }}
                  className={'hover:text-blue-400 duration-200 ' + (muscles.includes(muscleGroup) ? ' text-blue-400' : ' ')}
                  key={muscleGroupIndex}
                >
                  <p className="uppercase">{muscleGroup.replace('_', ' ')}</p>
                </button>
              );
            })}
          </div>
        )}
      </div>
      <Header index={'03'} title={'Become Juggernaut'} description={'Select your ultimate objective.'} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {Object.keys(SCHEMES).map((scheme, schemeIndex) => {
          return (
            <button
              onClick={() => {
                setGoal(scheme);
              }}
              className={'bg-slate-950 border border-blue-400 hover:border-blue-600 py-3 rounded-lg duraton-200 px-4 ' + (scheme === goal ? 'border-blue-600' : 'border-blue-400')}
              key={schemeIndex}
            >
              <p className="capitalize">{scheme.replaceAll('_', ' ')}</p>
            </button>
          );
        })}
      </div>
      <Button func={updateWorkout} text={'Formulate'} />
    </SectionWrapper>
  );
};

export default Generator;
