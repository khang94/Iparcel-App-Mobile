/**
 * Copyright 2016 Facebook, Inc.
 *
 * You are hereby granted a non-exclusive, worldwide, royalty-free license to
 * use, copy, modify, and distribute this software in source code or binary
 * form for use in connection with the web services and APIs provided by
 * Facebook.
 *
 * As with any software that integrates with the Facebook platform, your use
 * of this software is subject to the Facebook Developer Principles and
 * Policies [http://developers.facebook.com/policy/]. This copyright notice
 * shall be included in all copies or substantial portions of the software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE
 *
 * @providesModule F8Colors
 * @flow
 */

'use strict';

const LOCATION_COLORS = {
  'HERBST': '#00E3AD',
  'HERBST A': '#00E3AD',
  'HERBST B': '#00E3AD',
  'HACKER X': '#4D99EF',
  'HACKER Y': '#CF72B1',
  'COWELL': '#6A6AD5',
  'COWELL C': '#6A6AD5',
  'FOOD TENT': '#FFCD3B',
};
const FlatColors=[ '#3498db','#2ecc71','#e74c3c','#8e44ad','#e67e22','#2c3e50','#16a085'];

function colorForLocation(location: ?string): string {
  if (!location) {
    return 'black';
  }

  var color = LOCATION_COLORS[location.toUpperCase()];
  if (!color) {
    console.warn(`Location '${location}' has no color`);
    color = 'black';
  }
  return color;
}

function colorForTopic(count: number, index: number): string {
  const hue = Math.round(360 * index / (count + 1));
  return `hsl(${hue}, 74%, 65%)`;
}

module.exports = {
  actionText: '#3FB4CF',
  inactiveText: '#9B9B9B',
  darkText: '#032250',
  lightText: '#7F91A7',
  cellBorder: '#EEEEEE',
  darkBackground: '#183E63',
  colorForLocation,
  colorForTopic,
  primary:'#FF4081',
  background:'#ecf0f1',
  navigation:'#484848',
  pink:'#E271AE',
  materialTF:'#00BCD4',
  flatColors:FlatColors,
  divider:'#bdc3c7',
  header:'#FF4081',
  red:'#F22613',
  headerListView : '#795548',
  popupSettingSmsBackground : '#C8C9CE',
  backgroundTheme : '#FF4081',
  backgroundTheme2 : '#F06292',
  buttonColor : '#C6FF00',
  buttonActionColor : 'rgba(231,76,60,1)',
  radioButtonColor : '#424242',

  yellowColor : '#827717',
  orangeColor : '#E65100',
  brownColor : '#3E2723',

  keywordSms : '#B0BEC5',

};
