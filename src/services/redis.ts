import * as redis from 'redis';
import { createHandyClient } from 'handy-redis';

import { Video } from '../models/video';


const client = createHandyClient();

export const getAll = async() => {
  //await client.set('foo', 'bar');
  const lst = await client.get('list');
  return lst;
}

export const setVideo = async(list) => {
  const str = JSON.stringify(list);
  await client.set('list', str);
}

