import { useCallback, useEffect, useRef, useState } from "react";
import { FileType } from "../types";
import { useSelected } from "../context/SelectedContext";
import gsap from "gsap";

/**
 * Хук для управления состоянием выбора (чекбокса) отдельного файла.
 * @param file - текущий файл
 * @param checkboxRef - ref на кнопку-чекбокс
 */
export const useFileLogic = (
  file: FileType,
  checkboxRef: React.RefObject<HTMLButtonElement | null>
) => {
  const { selected, setSelected } = useSelected();
  const [isChecked, setIsChecked] = useState<boolean>(false);

  // Храним признак, что компонент уже прошёл хотя бы одну фазу монтирования
  const hasMounted = useRef(false);

  // Добавить/убрать файл из массива выбранных (только при реальном действии)
  const handleUserCheck = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelected((prev) => {
          if (!prev) return [file];
          // Если файл уже в списке – не перезаписываем
          if (prev.some((item) => item.id === file.id)) return prev;
          return [...prev, file];
        });
      } else {
        setSelected((prev) => {
          if (!prev) return prev;
          return prev.filter((item) => item.id !== file.id);
        });
      }
    },
    [file, setSelected]
  );

  // Когда selected меняется (включаем / выключаем режим), а также при первом рендере
  // мы подстраиваем локальный чекбокс и анимацию
  useEffect(() => {
    const isSelectModeOn = selected !== null;

    if (!isSelectModeOn) {
      // Режим выключен
      hideCheckbox(!hasMounted.current);
      // Сброс локального выбора
      if (isChecked !== false) {
        setIsChecked(false);
      }
    } else {
      // Режим включен (selected = [] или список)
      showCheckbox(!hasMounted.current);

      // Если файл уже присутствует в глобальном selected – выставим isChecked в true
      const fileInSelected = selected.some((item) => item.id === file.id);
      if (fileInSelected && !isChecked) {
        setIsChecked(true);
      } else if (!fileInSelected && isChecked) {
        // Если вдруг локально стоит true, а на самом деле мы убрали файл из selected
        setIsChecked(false);
      }
    }

    // После первого рендера запоминаем, что уже монтировались
    if (!hasMounted.current) {
      hasMounted.current = true;
    }
  }, [selected, file.id, isChecked]);

  // Функция анимации появления чекбокса
  const showCheckbox = (instantly = false) => {
    gsap.to(checkboxRef.current, {
      width: 20,
      height: 20,
      scale: 1,
      opacity: 1,
      marginRight: 8,
      duration: instantly ? 0 : 0.5,
    });
  };

  // Функция анимации скрытия чекбокса
  const hideCheckbox = (instantly = false) => {
    gsap.to(checkboxRef.current, {
      width: 0,
      height: 0,
      scale: 0,
      opacity: 0,
      marginRight: 0,
      duration: instantly ? 0 : 0.5,
    });
  };

  return {
    isChecked,
    setIsChecked,
    handleUserCheck, // вызываем, когда пользователь вручную кликает по чекбоксу
  };
};