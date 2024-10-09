import { Search, X } from "lucide-react";
import { useState } from "react";
import { Input, ScrollArea } from "~/components/ui";
import { Checkbox } from "~/components/ui/checkbox";
import { DialogContentProps } from "./types";

const languages = [
  "English",
  "Afrikaans",
  "Albanian",
  "Arabic",
  "Armenian",
  "Azerbaijani",
  "Basque",
  "Belarusian",
  "Bengali",
  "Bosnian",
  "Bulgarian",
  "Burmese",
  "Catalan",
  "Chinese",
  "Croatian",
  "Czech",
  "Danish",
  "Dutch",
  "Estonian",
  "Filipino",
  "Finnish",
  "French",
  "Galician",
  "Georgian",
  "German",
  "Greek",
  "Gujarati",
  "Haitian",
  "Hebrew",
  "Hindi",
  "Hungarian",
  "Icelandic",
  "Indonesian",
  "Irish",
  "Italian",
  "Japanese",
  "Kannada",
  "Khmer",
  "Korean",
  "Kyrgyz",
  "Lao",
  "Latvian",
  "Lithuanian",
  "Macedonian",
  "Malay",
  "Maltese",
  "Norwegian",
  "Persian",
  "Polish",
  "Portuguese",
  "Punjabi",
  "Romanian",
  "Russian",
  "Serbian",
  "Sign Language",
  "Slovakian",
  "Slovenian",
  "Spanish",
  "Swahili",
  "Swedish",
  "Tagalog",
  "Tamil",
  "Telugu",
  "Thai",
  "Turkish",
  "Ukrainian",
  "Urdu",
  "Vietnamese",
  "Xhosa",
  "Zulu",
  "मराठी",
];

const LanguagesDialogContent = ({
  item,
  value = [],
  onChange,
}: DialogContentProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLanguages = languages.filter((lang) =>
    lang.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleLanguage = (language: string) => {
    const typedValue = value as string[];

    onChange(
      typedValue.includes(language)
        ? typedValue.filter((lang) => lang !== language)
        : [...typedValue, language],
    );
  };

  return (
    <div className="p-5">
      <h2 className="mb-4 text-3xl font-semibold">{item.title}</h2>
      <div className="relative mt-8">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search for a language"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
        {searchTerm && (
          <X
            className="absolute right-2 top-2.5 h-4 w-4 cursor-pointer text-muted-foreground"
            onClick={() => setSearchTerm("")}
          />
        )}
      </div>
      <ScrollArea className="mt-8 h-[300px] pr-4">
        {filteredLanguages.map((language) => (
          <div
            key={language}
            className="z-10 flex items-center space-x-2 border-b py-6 last:border-b-0"
          >
            <label
              htmlFor={language}
              className="text-md mr-auto leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {language}
            </label>
            <Checkbox
              id={language}
              className="size-6"
              checked={(value as string[]).includes(language)}
              onCheckedChange={() => toggleLanguage(language)}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default LanguagesDialogContent;
