import React, { useState } from 'react';
import toast from 'react-hot-toast';
import moment from 'moment';

import icsToJson, { IcsData } from '@shared/helpers/icsToJson';
// import { useAppSelector } from '@redux/hook';
// import { selectorSchedule } from '@redux/schedule/selector';

import styles from './icsUploader.module.scss';

const ICSUploader = () => {
  const [icsData, setIcsData] = useState<IcsData[] | null>(null);
  // const { meetingsSchedule } = useAppSelector(selectorSchedule);

  const mathRandom = () => Math.floor(Math.random() * 100);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      toast.success('File successfully upload!');

      const reader = new FileReader();
      reader.onload = (e) => {
        const icsContent = e.target?.result as string;
        const data = icsToJson(icsContent);

        const transformedData = data.map((icsItem) => ({
          id: mathRandom(),
          date: moment(icsItem.startDate, 'YYYYMMDDTHHmmss').format(
            'YYYY-MM-DD HH:mm'
          ),
          task: icsItem.summary,
          ...icsItem,
        }));

        setIcsData(transformedData);
      };
      reader.readAsText(file);
    }
  };
  // if (icsData) {
  //   console.log([...meetingsSchedule, ...icsData]);
  // }

  return (
    <div>
      <input
        type="file"
        accept=".ics"
        onChange={handleFileUpload}
        className={styles.input}
      />
    </div>
  );
};

export default ICSUploader;
