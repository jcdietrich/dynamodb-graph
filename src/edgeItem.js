'use strict';

var cuid = require('cuid');
var utils = require('./modules/utils.js');

/**
 * Returns an EdgeItem structure as a JavaScript object. The node and the
 * target must be defined for te edge to be created. The GISK number is
 * generated as a random value from 0 to 4 by default. This can be modified by
 * passing the `maxGSKI` value as a parameter.
 * @param {EdgeItemConfig} config EdgeItem configuration object.
 * @returns {EdgeItem} Node item object.
 */
module.exports = function edgeItem(config) {
  var { tenant = '', node, target, type, data, maxGSIK, tgsik = true } = config;

  if (node === undefined) throw new Error('Node is undefined');
  if (target === undefined) throw new Error('Target is undefined');
  if (type === undefined) throw new Error('Type is undefined');
  if (data === undefined) throw new Error('Data is undefined');

  var params = {
    Node: node,
    Type: type,
    Data: JSON.stringify(data),
    Target: target,
    GSIK: utils.calculateGSIK(config)
  };

  if (!!tgsik) {
    params.TGSIK = utils.calculateTGSIK(
      typeof tgsik === 'string'
        ? Object.assign({}, config, { type: tgsik })
        : config
    );
  }

  return params;
};
