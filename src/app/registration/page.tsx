import React from 'react';
import RegInputs from '../../components/reg-inputs';

const RegPage: React.FC = () => {
  return (
    <div className='flex flex-col items-center w-full mt-[27] mb-[52]'>
        <span className='font-bold text-[24px] leading-[100%] font-[Montserrat] text-[var(--color8)] max-w-[300] mt-[27]'>Заполни небольшую анкету о себе</span>
        <p className='font-medium text-[13px] leading-[100%] tracking-[0] font-[Montserrat] mt-[10] max-w-[300]'>Вся информация будет выводится исходя из данной информации</p>
        <div className='max-w-[300] w-full'>
          <RegInputs institute={"ивмиит"} but={"Дальше"} role={null}/>
        </div>
    </div>
  );
};

export default RegPage;