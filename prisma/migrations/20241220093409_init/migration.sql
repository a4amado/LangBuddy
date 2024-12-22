-- CreateEnum
CREATE TYPE "LanguageRank" AS ENUM ('mother', 'other');

-- CreateEnum
CREATE TYPE "Level" AS ENUM ('level_1', 'level_2', 'level_3');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('AFRIKAANS', 'ALBANIAN', 'AMHARIC', 'ARABIC', 'ARMENIAN', 'ASSAMESE', 'AYMARA', 'AZERBAIJANI', 'BAMBARA', 'BASQUE', 'BELARUSIAN', 'BENGALI', 'BHOJPURI', 'BOSNIAN', 'BULGARIAN', 'CATALAN', 'CEBUANO', 'CHINESE_SIMPLIFIED', 'CHINESE_TRADITIONAL', 'CORSICAN', 'CROATIAN', 'CZECH', 'DANISH', 'DHIVEHI', 'DOGRI', 'DUTCH', 'ENGLISH', 'ESPERANTO', 'ESTONIAN', 'EWE', 'FILIPINO', 'FINNISH', 'FRENCH', 'FRISIAN', 'GALICIAN', 'GEORGIAN', 'GERMAN', 'GREEK', 'GUARANI', 'GUJARATI', 'HAITIAN_CREOLE', 'HAUSA', 'HAWAIIAN', 'HEBREW', 'HINDI', 'HMONG', 'HUNGARIAN', 'ICELANDIC', 'IGBO', 'ILOCANO', 'INDONESIAN', 'IRISH', 'ITALIAN', 'JAPANESE', 'JAVANESE', 'KANNADA', 'KAZAKH', 'KHMER', 'KINYARWANDA', 'KONKANI', 'KOREAN', 'KRIO', 'KURDISH_KURMANJI', 'KURDISH_SORANI', 'KYRGYZ', 'LAO', 'LATIN', 'LATVIAN', 'LINGALA', 'LITHUANIAN', 'LUGANDA', 'LUXEMBOURGISH', 'MACEDONIAN', 'MAITHILI', 'MALAGASY', 'MALAY', 'MALAYALAM', 'MALTESE', 'MAORI', 'MARATHI', 'MEITEILON_MANIPURI', 'MIZO', 'MONGOLIAN', 'MYANMAR_BURMESE', 'NEPALI', 'NORWEGIAN', 'NYANJA_CHICHEWA', 'ODIA_ORIYA', 'OROMO', 'PASHTO', 'PERSIAN', 'POLISH', 'PORTUGUESE', 'PUNJABI', 'QUECHUA', 'ROMANIAN', 'RUSSIAN', 'SAMOAN', 'SANSKRIT', 'SCOTS_GAELIC', 'SEPEDI', 'SERBIAN', 'SESOTHO', 'SHONA', 'SINDHI', 'SINHALA', 'SLOVAK', 'SLOVENIAN', 'SOMALI', 'SPANISH', 'SUNDANESE', 'SWAHILI', 'SWEDISH', 'TAJIK', 'TAMIL', 'TATAR', 'TELUGU', 'THAI', 'TIGRINYA', 'TSONGA', 'TURKISH', 'TURKMEN', 'TWI_AKA', 'UKRAINIAN', 'URDU', 'UYGHUR', 'UZBEK', 'VIETNAMESE', 'WELSH', 'XHOSA', 'YIDDISH', 'YORUBA', 'ZULU');

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdById" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "refresh_token_expires_in" INTEGER,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersLanguage" (
    "id" TEXT NOT NULL,
    "language" "Language" NOT NULL,
    "rank" "LanguageRank" NOT NULL,
    "level" "Level" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "UsersLanguage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "last_messege_id" TEXT,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMessege" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,

    CONSTRAINT "ChatMessege_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatMember" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ChatToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "Post_name_idx" ON "Post"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "ChatMessege_chat_id_key" ON "ChatMessege"("chat_id");

-- CreateIndex
CREATE UNIQUE INDEX "ChatMember_chat_id_user_id_key" ON "ChatMember"("chat_id", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_ChatToUser_AB_unique" ON "_ChatToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChatToUser_B_index" ON "_ChatToUser"("B");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersLanguage" ADD CONSTRAINT "UsersLanguage_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_last_messege_id_fkey" FOREIGN KEY ("last_messege_id") REFERENCES "ChatMessege"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessege" ADD CONSTRAINT "ChatMessege_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMessege" ADD CONSTRAINT "ChatMessege_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatMember" ADD CONSTRAINT "ChatMember_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToUser" ADD CONSTRAINT "_ChatToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChatToUser" ADD CONSTRAINT "_ChatToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
