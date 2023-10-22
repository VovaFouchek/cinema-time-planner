/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import toast from 'react-hot-toast';
import moment from 'moment';

import icsToJson from '@helpers/icsToJson';
import { useAppDispatch } from '@redux/hook';
import { setIcsData } from '@redux/schedule/reducer';

import styles from './icsUploader.module.scss';

const ICSUploader = () => {
  const dispatch = useAppDispatch();

  const mathRandom = () => Math.floor(Math.random() * 100);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      toast.success('File successfully upload!');

      const reader = new FileReader();
      reader.onload = (e) => {
        const icsContent = e.target?.result as string;
        const data = icsToJson(icsContent);

        const transformedData = data.map((icsItem) => {
          return {
            id: mathRandom(),
            date: moment(icsItem.startDate, 'YYYYMMDDTHHmmss').format(
              'YYYY-MM-DD HH:mm'
            ),
            task: icsItem.summary,
            ...icsItem,
          };
        });

        dispatch(setIcsData(transformedData));
      };
      reader.readAsText(file);
    }
  };

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
