/* eslint-disable no-restricted-syntax */
import { IcsToJsonData } from '@shared/interfaces';

const NEW_LINE = /\r\n|\n|\r/;
const EVENT = 'VEVENT';
const EVENT_START = 'BEGIN';
const EVENT_END = 'END';
const START_DATE = 'DTSTART';
const END_DATE = 'DTEND';
const DESCRIPTION = 'DESCRIPTION';
const SUMMARY = 'SUMMARY';
const LOCATION = 'LOCATION';
const ALARM = 'VALARM';

const keyMap: Record<string | number, keyof IcsToJsonData> = {
  [START_DATE]: 'startDate',
  [END_DATE]: 'endDate',
  [DESCRIPTION]: 'description',
  [SUMMARY]: 'summary',
  [LOCATION]: 'location',
};

const clean = (string: string) => {
  return decodeURI(string).trim();
};

const icsToJson = (icsData: string): IcsToJsonData[] => {
  const array: IcsToJsonData[] = [];
  let currentObj: Partial<IcsToJsonData> | null = null;
  let lastKey: keyof IcsToJsonData | null = null;
  const lines = icsData.split(NEW_LINE);
  let isAlarm = false;

  for (const line of lines) {
    let key = line.split(':')[0];
    const value = line.split(':')[1];

    if (key.includes(';')) {
      const [mainKey] = key.split(';');
      key = mainKey;
    }

    if (value) {
      lastKey = keyMap[key];

      switch (key) {
        case EVENT_START:
          if (value === EVENT) {
            currentObj = {};
          } else if (value === ALARM) {
            isAlarm = true;
          }
          break;

        case EVENT_END:
          isAlarm = false;
          if (value === EVENT && currentObj !== null) {
            array.push(currentObj as IcsToJsonData);
          }
          break;

        case START_DATE:
        case END_DATE:
          if (currentObj !== null) {
            currentObj[keyMap[key]] = value;
          }
          break;

        case DESCRIPTION:
          if (!isAlarm && currentObj !== null) {
            currentObj[keyMap[DESCRIPTION]] = clean(value);
          }
          break;

        case SUMMARY:
          if (currentObj !== null) {
            currentObj[keyMap[SUMMARY]] = clean(value);
          }
          break;

        case LOCATION:
          if (currentObj !== null) {
            currentObj[keyMap[LOCATION]] = clean(value);
          }
          break;

        default:
          break;
      }
    } else if (lastKey !== null) {
      currentObj![lastKey] += clean(key);
    }
  }

  return array;
};

export default icsToJson;
