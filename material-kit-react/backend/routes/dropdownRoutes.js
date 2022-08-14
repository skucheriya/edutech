import express from 'express'
import { DropdownData } from '../models/dropDownModel.js';
const dropdownRoutes = express()

dropdownRoutes.get('/dropdowns', async (req, res) => {
    const dropdowns = await DropdownData.find({})
    res.send(...dropdowns);
  });


export default dropdownRoutes