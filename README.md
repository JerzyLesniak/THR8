# THR 08 Widget - Sterowanie Jasnością Lamp Lotniskowych

## Opis

Jest to komponent widgetu do sterowania grupą lamp lotniskowych **THR 08**, które są zasilane bateryjnie. Widget umożliwia:

- Sterowanie jasnością lamp za pomocą przycisków **[+]** i **[-]**.
- Wyświetlanie aktualnego poziomu jasności w formie liczbowej oraz za pomocą poziomych pasków na górze widgetu.
- Wyświetlanie pozostałego czasu działania lamp na baterii.
- Zmianę trybów pracy lamp przy pomocy trzech przełączników:
  - **Night Vision**: Tryb pracy w nocy.
  - **Dusk Till Dawn**: Automatyczne włączanie i wyłączanie w zależności od pory dnia.
  - **Flashing**: Tryb migania.

## Technologie

Projekt został stworzony przy użyciu następujących technologii:

- **TypeScript**: Język programowania z systemem typów.
- **React**: Biblioteka do budowania interfejsu użytkownika.
- **CSS**: Użyto zwykłego CSS z zastosowaniem zagnieżdżania (nesting).

## Skrypty

### `npm run test`
Uruchamia testy jednostkowe przy użyciu Vitest.

```bash
npm run test
```

### `npm run build`
Buduje aplikację. Najpierw kompiluje TypeScript, a następnie buduje aplikację przy użyciu Vite.

```bash
npm run build
```

### `npm run preview`
Serwuje zbudowaną aplikację lokalnie w trybie podglądu przy użyciu Vite.

\```bash
npm run preview
\```

## Instalacja

Aby uruchomić projekt lokalnie, wykonaj następujące kroki:

1. Sklonuj repozytorium:

```bash
git clone https://github.com/uzytkownik/nazwa-repozytorium.git
```

2. Zainstaluj zależności:

```bash
npm install
```

3. Uruchom środowisko deweloperskie:

```bash
npm run dev
```

4. Aby uruchomić testy:

```bash
npm run test
```

5. Aby zbudować aplikację do produkcji:

```bash
npm run build
```

6. Aby uruchomić lokalny serwer z zbudowaną aplikacją:

```bash
npm run preview
```
