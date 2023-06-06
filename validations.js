import { body } from 'express-validator'

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
  ];
  
export const registerValidation = [
    body('email','Почта указана неверно').isEmail(),
    body('password','Пароль должен содержать минимум 5 символов').isLength({min:5}),
    body('fullName', 'Введите имя').isLength({min:3}),
    body('avatarUrl','Ссылка указана неверно').optional().isURL(),
]

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тэгов').optional().isString(),
    body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
  ];