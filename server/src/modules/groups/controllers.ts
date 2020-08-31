import { Request, Response } from 'express';
import { GroupModel } from 'modules/groups/model';

import { getResponseError } from 'helpers/getResponseError';

export const createGroup = async (req: Request, res: Response) => {
  try {
    // получаем параметры из body
    const {
      label,
      type,
      contactsIds,
      user: { groupsIds },
    } = req.body;

    // ищем созданные группы с таким же label
    const createdGroup = await GroupModel.find({
      _id: {
        $in: groupsIds,
      },
      label: label,
    });

    if (groupsIds && createdGroup) {
      // ошбика если у этого пользователя такая группа уже существует
      return getResponseError(res, 'Group is already exist', 500);
    }

    // создаем группу
    const group = await GroupModel.create({
      label,
      type,
      contactsIds,
    });

    // возвращаем группу в ответе
    res.json(group);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const getGroups = async (req: Request, res: Response) => {
  try {
    const {
      user: { groupsIds },
    } = req.body;

    // получаем список групп
    const groups = await GroupModel.find({
      _id: {
        $in: groupsIds,
      },
    });

    // возврщаем в ответе список групп
    res.json(groups);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const getGroup = async (req: Request, res: Response) => {
  try {
    const {
      user: { groupsIds },
    } = req.body;
    const currentGroupId = req.params.id;

    if (!groupsIds.include(currentGroupId)) {
      // исключение, если у пользователя нет группы с таким id
      return getResponseError(res, 'The user has no such group found', 500);
    }

    const groupById = await GroupModel.findById(currentGroupId);

    if (!groupById) {
      // 404 ошибка если группа не найдена
      return getResponseError(res, 'No such group found', 404);
    }

    // возвращаем в ответе найденную группу
    return res.json(groupById);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const {
      user: { groupsIds },
    } = req.body;
    const currentGroupId = req.params.id;

    if (!groupsIds.include(currentGroupId)) {
      // исключение, если у пользователя нет группы с таким id
      return getResponseError(res, 'The user has no such group found', 500);
    }

    // получение параметров для обновления
    const { label, type, contactsIds } = req.body;

    // ищем контакт по id
    const groupById = await GroupModel.findById(currentGroupId);

    if (!groupById) {
      // 404 ошибка если группа не найдена
      return getResponseError(res, 'No such group to update', 404);
    }

    // проходим по каждому параметру и, если он существует, - обновляем
    if (label) {
      groupById.label = label;
    }

    if (type) {
      groupById.type = type;
    }

    if (contactsIds) {
      groupById.contactsIds = contactsIds;
    }

    // сохраняем имзененную группу в базе
    await groupById.save();

    // возвращаем обновленную группу в ответе
    return res.json(groupById);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    const {
      user: { groupsIds },
    } = req.body;
    const currentGroupId = req.params.id;

    if (!groupsIds.include(currentGroupId)) {
      // исключение, если у пользователя нет группы с таким id
      return getResponseError(res, 'The user has no such group found', 500);
    }

    // поиск и удаление группы по id
    const groupById = await GroupModel.findByIdAndDelete(currentGroupId);

    if (!groupById) {
      // 404 ошибка если группа не найдена
      return getResponseError(res, 'No such group to delete', 404);
    }

    // возвращаем удаленный контакт (можно возращать true)
    return res.json(groupById);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};
