const { Contact } = require("../models/contact");

const { ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find({ owner }, "", { skip, limit });
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const { _id: owner } = req.user;
  const result = await Contact.create({ ...req.body, owner });
  res.status(200).json(result);
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json({
    message: "Delete succenss ",
  });
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });

  if (!result) {
    console.log(result);
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
