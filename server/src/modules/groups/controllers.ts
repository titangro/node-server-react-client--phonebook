import { Request, Response } from 'express';
import { GroupModel } from 'modules/groups/model';
import { UserModel } from 'modules/auth/model';

import { getResponseError } from 'helpers/getResponseError';
import { values as groupValues } from './model';

export const createGroup = async (req: Request, res: Response) => {
  try {
    // получаем параметры из body
    const {
      label,
      type,
      contactsIds,
      user: { groupsIds, _id: userId },
    } = req.body;

    // ищем созданные группы с таким же label
    const createdGroups = await GroupModel.find({
      _id: {
        $in: groupsIds,
      },
      label,
    });

    if (groupsIds.length && createdGroups.length) {
      // ошбика если у этого пользователя такая группа уже существует
      return getResponseError(res, 'Group is already exist', 500);
    }

    // проверка, что label соответствует зарезервированным значениям
    if (!groupValues.labels.includes(label)) {
      return getResponseError(
        res,
        `Group label must have one of required value: ${groupValues.labels}`,
        500,
      );
    }

    // проверка, что type соответствует зарезервированным значениям
    if (!groupValues.types.includes(type)) {
      return getResponseError(
        res,
        `Group type must have one of required value: ${groupValues.types}`,
        500,
      );
    }

    // создаем группу
    const group = await GroupModel.create({
      label,
      type,
      contactsIds,
    });

    // добавляем привязку по группе пользователю
    const currentUser = await UserModel.findById(userId);
    currentUser!.groupsIds?.push(group._id);
    currentUser!.save();

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

    if (!groupsIds.includes(currentGroupId)) {
      // исключение, если у пользователя нет группы с таким id
      return getResponseError(res, 'The user has no such group found', 500);
    }

    // получаение группы по id
    const groupById = await GroupModel.findById(currentGroupId);

    if (!groupById) {
      return getResponseError(res, 'Group has not found', 404);
    }

    return res.json(groupById);
  } catch (error) {
    console.log('getGroup -> error', error);
    return getResponseError(res, error, 500);
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const {
      user: { groupsIds },
    } = req.body;
    const currentGroupId = req.params.id;

    if (!groupsIds.includes(currentGroupId)) {
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

    // проверка, что label соответствует зарезервированным значениям
    if (!groupValues.labels.includes(label)) {
      return getResponseError(
        res,
        `Group label must have one of required value: ${groupValues.labels}`,
        500,
      );
    }

    // проверка, что type соответствует зарезервированным значениям
    if (!groupValues.types.includes(type)) {
      return getResponseError(
        res,
        `Group type must have one of required value: ${groupValues.types}`,
        500,
      );
    }

    // ищем созданные группы с таким же label
    const createdGroups = await GroupModel.find({
      _id: {
        $in: groupsIds,
      },
      label,
    });

    // сравниваем что label не из действующей группы
    const createdLabels = createdGroups
      .map((item) => item.label)
      .includes(groupById.label);

    if (createdGroups.length && !createdLabels) {
      // ошбика если у этого пользователя такая группа уже существует
      return getResponseError(res, 'Group is already exist', 500);
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
      user: { groupsIds, _id: userId },
    } = req.body;
    const currentGroupId = req.params.id;

    if (!groupsIds.includes(currentGroupId)) {
      // исключение, если у пользователя нет группы с таким id
      return getResponseError(res, 'The user has no such group found', 500);
    }

    // поиск и удаление группы по id
    const groupById = await GroupModel.findByIdAndDelete(currentGroupId);

    if (!groupById) {
      // 404 ошибка если группа не найдена
      return getResponseError(res, 'No such group to delete', 404);
    }

    // удаляем привязку по группе пользователю
    const currentUser = await UserModel.findById(userId);
    currentUser!.groupsIds = currentUser!.groupsIds?.filter(
      (id) => id !== groupById._id,
    );
    currentUser!.save();

    // возвращаем удаленный контакт (можно возращать true)
    return res.json(groupById);
  } catch (error) {
    return getResponseError(res, error, 500);
  }
};
