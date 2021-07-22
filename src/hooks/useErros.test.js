import { renderHook, act } from '@testing-library/react-hooks';
import useErros from './useErros';

describe('useErrors', () => {
  test('deve permitir enviar campo sem erro', () => {
    const validacoes = {
      marca: (dado) => {
        if (dado && dado.length >= 3) {
          return { valido: true };
        }
        return { valido: false, texto: 'Marca deve ter ao menos 3 letras.' };
      },
    };

    const { result } = renderHook(() => useErros(validacoes));

    act(() => {
      // eslint-disable-next-line no-unused-vars
      const [erros, validarCampos, possoEnviar] = result.current;
      validarCampos({ target: { name: 'marca', value: 'xxx' } });
    });

    // eslint-disable-next-line no-unused-vars
    const [erros, validarCampos, possoEnviar] = result.current;

    expect(erros).toEqual({ marca: { valido: true } });
    expect(possoEnviar()).toBe(true);
  });

  test('não deve permitir enviar campo com erro', () => {
    const validacoes = {
      marca: (dado) => {
        if (dado && dado.length >= 3) {
          return { valido: true };
        }
        return { valido: false, texto: 'Marca deve ter ao menos 3 letras.' };
      },
    };

    const { result } = renderHook(() => useErros(validacoes));

    act(() => {
      // eslint-disable-next-line no-unused-vars
      const [erros, validarCampos, possoEnviar] = result.current;

      validarCampos({ target: { name: 'marca', value: 'x' } });
    });

    // eslint-disable-next-line no-unused-vars
    const [erros, validarCampos, possoEnviar] = result.current;

    expect(erros).toEqual({
      marca: {
        texto: 'Marca deve ter ao menos 3 letras.',
        valido: false,
      },
    });
    expect(possoEnviar()).toBe(false);
  });
});
