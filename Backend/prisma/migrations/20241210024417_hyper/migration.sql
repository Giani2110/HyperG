/*
  Warnings:

  - You are about to drop the column `genre` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `installed` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `platform` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Library` table. All the data in the column will be lost.
  - Changed the type of `price` on the `Games` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `gameId` to the `Library` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instaled` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "price",
ADD COLUMN     "price" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Library" DROP COLUMN "genre",
DROP COLUMN "img",
DROP COLUMN "installed",
DROP COLUMN "platform",
DROP COLUMN "price",
DROP COLUMN "rating",
DROP COLUMN "title",
ADD COLUMN     "gameId" INTEGER NOT NULL,
ADD COLUMN     "instaled" BOOLEAN NOT NULL;

INSERT INTO "Games" ("title", "genre", "price", "rating", "platform", "img") values
('The Legend of Zelda: Breath of the Wild', 'Adventure', 29.99, 4.9, 'Console', 'https://imgs.search.brave.com/rLPIvNVzp8VxJgCxXk_L1oIMHeFOANuM8sQ98KvNYVc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS52YW5kYWwubmV0/L3QyMDAvNDMwMzAv/dGhlLWxlZ2VuZC1v/Zi16ZWxkYS1icmVh/dGgtb2YtdGhlLXdp/bGQtMjAxNzMyMTMx/NDI5XzEuanBn'),
('Elden Ring', 'RPG', 59.99, 4.8, 'PC', 'https://imgs.search.brave.com/uUKfAt8mU1YGdCbRCPltif27qxF7kEfyikIffKEtG04/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L2Vs/ZGVucmluZy9pbWFn/ZXMvMC8wZC9FbGRl/bl9SaW5nX1BvcnRh/ZGEuanBnL3Jldmlz/aW9uL2xhdGVzdC9z/Y2FsZS10by13aWR0/aC1kb3duLzMwMD9j/Yj0yMDIzMDMzMTIy/MzgwNCZwYXRoLXBy/ZWZpeD1lcw.jpeg'),
('Cyberpunk 2077', 'RPG', 19.99, 4.6, 'PC', 'https://imgs.search.brave.com/h51q0JqTASWIFrslgsv45V0gBscRHfHzkndIutRlRnI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aG9iYnljb25zb2xh/cy5jb20vc2l0ZXMv/bmF2aS5heGVsc3By/aW5nZXIuZXMvcHVi/bGljL21lZGlhL2lt/YWdlLzIwMjAvMDIv/Y3liZXJwdW5rLTIw/NzctcG9ydGFkYS1m/aWNoYS0wMS0xODc3/MzU3LmpwZz90Zj0z/ODQweA'),
('The Witcher 3', 'Action', 49.99, 4.9, 'PC', 'https://imgs.search.brave.com/CQ6Ro42dLKO1LCYzLb7tfJNrHhNXBuYGsDPdsfSHBIw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aG9iYnljb25zb2xh/cy5jb20vc2l0ZXMv/bmF2aS5heGVsc3By/aW5nZXIuZXMvcHVi/bGljL21lZGlhL2lt/YWdlLzIwMTYvMDcv/d2l0Y2hlci0zLXdp/bGQtaHVudC1jYXJh/dHVsYS5qcGc_dGY9/Mzg0MHg'),
('Red Dead Redemption 2', 'Action', 9.99, 4.3, 'Console', 'https://imgs.search.brave.com/PppndanAZDWqkvpy2R4MyCIm-Glv-WaCzh3dDrFS7DM/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/aG9iYnljb25zb2xh/cy5jb20vc2l0ZXMv/bmF2aS5heGVsc3By/aW5nZXIuZXMvcHVi/bGljL21lZGlhL2lt/YWdlLzIwMTYvMTAv/cmVkLWRlYWQtcmVk/ZW1wdGlvbi0yLWNh/cmF0dWxhLXByb3Zp/c2lvbmFsLmpwZz90/Zj0zODQweA'),
('The Last of Us', 'Action', 35.99, 4.7, 'Console', 'https://imgs.search.brave.com/3TIR95xDX1gxBYuO3TtahMTK4M21ARh55D0MsUK59bQ/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMuaGJvLmNvbS8y/MDI0LTAzL1RoZUxh/c3RvZlVzXzI1NjB4/Mzg0MC1jLmpwZw'),
('Rocket League', 'Sports', 0, 4.8, 'Console', 'https://imgs.search.brave.com/pfsCQm4z5KIFe4PGvsMQY6YIZD4ovVhiS3B1N5nx8Kc/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvcm9j/a2V0LWxlYWd1ZS04/MDAteC0xMjAwLXBp/Y3R1cmUtaDhmNW1v/aG0yazE5ZWF0OS5q/cGc'),
('Grand Theft Auto V', 'Action', 19.99, 4.2, 'PC', 'https://imgs.search.brave.com/PYbKN8RnZ6FGjNzMSUV8iCV7qlbmxON-csx1s2qBzGU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzhkL2Ey/LzJiLzhkYTIyYjBk/MjU2ODM4NWI5MzVj/ZWM4YzU5MGI4MmVk/LmpwZw'),
('F1 23', 'Sports', 9.99, 4.5, 'Console', 'https://imgs.search.brave.com/faF3ma-fsQ8UcaJXGO1-ny_lU6mZEIBx9y0bISfTirA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFDQW5qNHM5bEwu/anBn'),
('The Legend of Zelda: Tears of the Kingdom', 'Adventure', 29.99, 4.4, 'PC', 'https://imgs.search.brave.com/SNnn7FjmuIqfam_1ZOxgQTQcB0fQA1-ElLLVAgch7jA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9uaW50/aGVvcmlzdC5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjQv/MDcvemVsZGFfZWNo/b2VzLW9mLXdpc2Rv/bV9ib3hhcnQuanBn/P3c9NjMy'),
('Minecraft', 'Adventure', 14.99, 4.6, 'PC', 'https://imgs.search.brave.com/XQ6TR2OpmKpaNuyCQa64VVHRkESjMya736CZgVGActE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9wcmV2/aWV3LnJlZGQuaXQv/dDQxOGp2Mzl3dzc1/MS5wbmc_d2lkdGg9/NjQwJmNyb3A9c21h/cnQmYXV0bz13ZWJw/JnM9OGJmZTdjZDVh/N2ZjZjI0MmI3ZThi/NjIwYjU1YWU4Yjlj/MDQzNGNhZg'),
('Apex Legends', 'Action', 0, 4.3, 'Console', 'https://imgs.search.brave.com/V9PqXNg_2GKM_Xeztilo1m0SJNeFxIysPdIGTjKz2RU/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YXByb3h5LnR2dHJv/cGVzLm9yZy93aWR0/aC8xMjAwL2h0dHBz/Oi8vc3RhdGljLnR2/dHJvcGVzLm9yZy9w/bXdpa2kvcHViL2lt/YWdlcy9hcGV4X2xl/Z2VuZHMuanBn'),
('FIFA 23', 'Adventure', 49.99, 4.1, 'Console', 'https://imgs.search.brave.com/K-SCIYP2-p9a8ASY7zUP0c4gzFvc0TDoEx8BVC6Vweo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpqVTROR0kw/WldRdFpqZzRZaTAw/WTJWaUxXRmpPR0l0/WlRFMU1HRm1Nelpq/WkRFeVhrRXlYa0Zx/Y0djQC5qcGc'),
('Fortnite', 'Action', 0, 4.3, 'PC', 'https://imgs.search.brave.com/HJ5_FRZJhRketnUpIazJYrEoOR6S8gAXT3fhDxJTA98/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk1UWmxNbUl4/TTJFdE4yWTRaaTAw/TTJaaExUazNOemd0/TmpKbVpUVTBNVFEz/WWpjd1hrRXlYa0Zx/Y0djQC5qcGc'),
('Among Us', 'Adventure', 0, 4.5, 'PC', 'https://imgs.search.brave.com/qx7Lk46rFyfEpJSTPy-r6O4cNtEs9gtpv_HMKEqWTn8/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMubmludGVuZG8u/Y29tL2ltYWdlL3Vw/bG9hZC9mX2F1dG8v/cV9hdXRvL2Rwcl8x/LjUvbmNvbS9zb2Z0/d2FyZS9zd2l0Y2gv/NzAwMTAwMDAwMzYw/OTgvZGVzYy9mYmE2/M2MwOWY0ZGQ0MWM4/NDFmMjM0NzQ4NDBj/OGY1ZmU0ZDUzNzhh/YWUzN2E5NGZmMzlh/ZGZmZmE3ZWYwYzEx.jpeg'),
('Call of Duty: Infinite Warfare', 'Action', 59.99, 4.4, 'Console', 'https://imgs.search.brave.com/sxR0xkJRs6xoaLV0798IHxRHNxfgy6XVccKI_7jtlKg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzU3L2Ix/L2Y3LzU3YjFmNzQ2/ODc5YWMzZDkwMzhi/MjRmZTJiMDBjMWYy/LmpwZw'),
('Super Mario Odyssey', 'Adventure', 29.99, 4.6, 'Console', 'https://imgs.search.brave.com/YB8chVF7PWEIys20r0fTZ9k7U7Vw4GkrAn5hMl2PXsA/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS52YW5kYWwubmV0/L3QyMDAvNDMzOTUv/c3VwZXItbWFyaW8t/b2R5c3NleS0yMDE3/MTAyNjExMDM1XzI1/LmpwZw'),
('Overwatch 2', 'Action', 0, 4.7, 'PC', 'https://imgs.search.brave.com/xwyPnVpfa6esTLkVdNGApaaVUUK1HJu_9xw9LSjTdx4/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YXByb3h5LnR2dHJv/cGVzLm9yZy93aWR0/aC8xMjAwL2h0dHBz/Oi8vc3RhdGljLnR2/dHJvcGVzLm9yZy9w/bXdpa2kvcHViL2lt/YWdlcy9vdmVyd2F0/Y2hfdHJhY2VyX2Nv/dmVyLmpwZw'),
('Hades', 'RPG', 29.99, 4.8, 'PC', 'https://imgs.search.brave.com/DkqnPCXBuoTrnaw1gGLI2WiXG69Q5T9OWPFhA40dCXE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YXByb3h5LnR2dHJv/cGVzLm9yZy93aWR0/aC8xMjAwL2h0dHBz/Oi8vc3RhdGljLnR2/dHJvcGVzLm9yZy9w/bXdpa2kvcHViL2lt/YWdlcy9oYWRlc18x/NDYucG5n'),
('Valorant', 'Action', 0, 4.4, 'PC', 'https://imgs.search.brave.com/N7DVzaw1K3XQ-i9hu9HiW0MNCs6atF_aHZw9tD8yZDo/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2U2L2Yz/LzA5L2U2ZjMwOTI5/N2M0NThlNTkzZjNi/YmM0YmFhNWQwZTA2/LmpwZw'),
('Ghost of Tsushima', 'RPG', 19.99, 4.2, 'PC', 'https://imgs.search.brave.com/BIhK09Itf97k9oPSRSu3a7MxlKI4qLAk7cM6m6uSO7M/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YXByb3h5LnR2dHJv/cGVzLm9yZy93aWR0/aC8xMjAwL2h0dHBz/Oi8vc3RhdGljLnR2/dHJvcGVzLm9yZy9w/bXdpa2kvcHViL2lt/YWdlcy9naG9zdG9m/dHN1c2hpbWEucG5n'),
('Animal Crossing: New Horizons', 'RPG', 9.99, 4.0, 'Console', 'https://imgs.search.brave.com/BbTSeyL5e3lL87NhmBs6Fn7iaHGZZxLr97ZZLRC35jg/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS52YW5kYWwubmV0/L3QyMDAvNjU1NTcv/YW5pbWFsLWNyb3Nz/aW5nLW5ldy1ob3Jp/em9ucy0yMDIwMTEw/MTIzNzU2NjdfMS5q/cGc'),
('Genshin Impact', 'RPG', 0, 4.1, 'Console', 'https://imgs.search.brave.com/eoEMP6YDiny_3bE-AAsTEiqZONHttrN1nW7mcZfMc_I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS52YW5kYWwubmV0/L3QyMDAvNzU5NjIv/Z2Vuc2hpbi1pbXBh/Y3QtMjAyMDk0MTc1/NzMzNjRfMS5qcGc'),
('Minecraft Dungeons', 'Adventure', 5.99, 4.3, 'PC', 'https://imgs.search.brave.com/rtrW4ZXzU18WnqtrPuaoXOjgi0Po0pX6v0925cho4_I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS52YW5kYWwubmV0/L3QyMDAvNjYyOTQv/bWluZWNyYWZ0LWR1/bmdlb25zLTIwMjA0/ODE5OTM2MjFfMS5q/cGc'),
('Sekiro: Shadows Die Twice', 'Action', 32.99, 4.2, 'PC', 'https://imgs.search.brave.com/wbb2As54QRYyUiYKJqUWnO7PwI3udrHmPnF6P3FlQRw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1Qk16RmlNMlkz/Tm1NdE5EWTNNQzAw/TVRoaExXRmhObVl0/WmpJek1ETmpabU5o/TVRkaFhrRXlYa0Zx/Y0djQC5qcGc'),
('Dead by Daylight', 'Action', 2.99, 4.1, 'PC', 'https://imgs.search.brave.com/_lxI0gM4vrNj8mmuN-J51czdTpE8DkS9uOWUa_00MMk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJjYXZlLmNv/bS93cC93cDIyMjIz/MjkuanBn'),
('Doom Eternal', 'Action', 29.99, 4.4, 'PC', 'https://imgs.search.brave.com/adgEOOYiuKSUeDLMdedJO46ODPB0jR3ffh-kHLxMJFE/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmJs/b2dzLmVzL2NkNjI3/Yy9hcHBzLjMzMjM4/LjY0MjM0NTU2OTU4/MzI0MTE0LmY5MjBj/ZWM5LWI0ZmItNDdm/NC1iYmFjLTY2N2Vk/OGJiODJlNi8xMzY2/XzIwMDAuanBlZw'),
('Persona 5', 'RPG', 49.99, 4.3, 'Console', 'https://imgs.search.brave.com/WG_FfA9TV_g6Za90nWXW-bl6g5OatQGJtt9fuHPlhjs/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9pLmJs/b2dzLmVzL2M1OGEx/NS9wNXJfa2V5X2Fy/dC8xMzY2XzIwMDAu/anBlZw'),
('Hollow Knight', 'Adventure', 14.99, 4.8, 'Console', 'https://imgs.search.brave.com/qe2OCTU3HjCUAi-SSBBr6pUnfR7nzJ4Kgl8rbDJPjOI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXIuZm9yZnVu/LmNvbS9mZXRjaC9l/Yi9lYjUxYTI0N2Rl/MDMzZDc3NTE4ZWRh/YjAyYjhlMWVlNy5q/cGVn'),
('Assassins Creed Valhalla', 'Action', 39.99, 4.7, 'PC', 'https://imgs.search.brave.com/vN1qZCoJjuoijcOfKY7b17SDVhwXJYRQhmZEGUAV_9I/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpqZGlZakpt/TkRndFl6Z3hNUzAw/TmprNExXRXpabU10/Tm1WallXTmpOREpr/WmpWaVhrRXlYa0Zx/Y0djQC5qcGc');