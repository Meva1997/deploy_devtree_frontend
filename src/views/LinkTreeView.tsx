import { useEffect, useState } from "react";
import { social } from "../data/social";
import DevTreeInput from "../components/DevTreeInput";
import { isValidUrl } from "../utils";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/devTreeAPI";
import type { SocialNetwork, User } from "../types";

export default function LinkTreeView() {
  const [devTreeLinks, setDevTreeLinks] = useState(social);

  const queryClient = useQueryClient();
  const user: User = queryClient.getQueryData(["user"])!;

  const { mutate } = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while updating the urls!"
      );
    },
    onSuccess: (data) => {
      toast.success(data || "Urls updated successfully!");
    },
  });

  useEffect(() => {
    const updatedData = devTreeLinks.map((item) => {
      const userLink = JSON.parse(user.links).find(
        (link: SocialNetwork) => link.name === item.name
      );
      if (userLink) {
        return { ...item, url: userLink.url, enabled: userLink.enabled };
      }
      return item;
    });
    setDevTreeLinks(updatedData); // Initialize the state with the user's links
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map((link) =>
      link.name === e.target.name ? { ...link, url: e.target.value } : link
    );

    setDevTreeLinks(updatedLinks); // Update the state with the modified links
  };

  // const links: SocialNetwork[] = JSON.parse(user.links); // Parse the user's links from the query client, links from the database

  const handleEnableLink = (socialNetwork: string) => {
    const updatedLinks = devTreeLinks.map((link) => {
      if (link.name === socialNetwork) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled };
        } else {
          toast.error(
            "Please enter a valid URL, start with http:// or https://"
          );
        }
      }
      return link;
    });

    setDevTreeLinks(updatedLinks);

    //! this code is not working as expected, it is not updating the links correctly and its from my Udemy course
    // let updatedItems: SocialNetwork[] = []; // Initialize an empty array to hold the updated items
    // const selectedSocialNetwork = updatedLinks.find(
    //   (link) => link.name === socialNetwork
    // );
    // if (selectedSocialNetwork?.enabled) {
    //   const id = links.filter(link => link.id).length + 1; // Get the next ID for the new item
    //  if(links.some((link) => link.name === socialNetwork)) {
    //   updatedItems = links.map((link) => {
    //     if (link.name === socialNetwork) {
    //       return { ...link, enabled: true, id }; // Toggle the enabled state
    //     }
    //  } else {
    //   const newItem = {
    //         ...selectedSocialNetwork,
    //         id
    //       };
    // }

    //   updatedItems = [...links, newItem]; // Add the new item to the existing links
    // } else {
    //   const indexToUpdate = links.findIndex((link) => link.name === socialNetwork); // Remove the item if it is disabled
    //   updatedItems = links.map((link => {
    //   if (link.name === socialNetwork) {
    //     return { ...link, id: 0 , enabled: false };
    //   } else if(link.id > indexToUpdate) {
    //    return { ...link, id: link.id - 1 }; // Decrement the ID of the remaining links
    //   } else {
    //   return link;
    //   }
    //   }))
    // }

    //! Filter and map to assign new IDs only to enabled links copilot helped me with this

    let idCounter = 1;
    const updatedItems = updatedLinks
      .map((link) => {
        if (link.enabled) {
          return { ...link, id: idCounter++ };
        } else if (isValidUrl(link.url) && !link.enabled) {
          return { ...link, id: 0 }; // Keep ID as null if URL is valid but not enabled
        } else {
          return { ...link, id: 0 }; // Set ID to null if URL is invalid
        }
      })
      .filter((link) => link!.enabled || isValidUrl(link!.url)); //return only enabled links or those with valid URLs

    //data to be sent to the backend
    queryClient.setQueryData(["user"], (prevData: User) => {
      return {
        ...prevData,
        links: JSON.stringify(updatedItems),
      };
    });
  };

  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((item) => (
          <DevTreeInput
            key={item.name}
            item={item}
            handleUrlChange={handleUrlChange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          className="w-full p-2 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600 hover:bg-cyan-600"
          onClick={() => mutate(queryClient.getQueryData(["user"])!)}
        >
          Save Changes
        </button>
      </div>
    </>
  );
}
