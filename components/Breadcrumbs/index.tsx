import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useState } from 'react';

const convertBreadcrumb = (string): string => {
  return string.replace(/-/g, ' ').replace(/oe/g, 'ö').replace(/ae/g, 'ä').replace(/ue/g, 'ü');
};

interface BreadcrumbsPropsType {
  dynamicLink?: string;
}

const Breadcrumbs: FC<BreadcrumbsPropsType> = (props: BreadcrumbsPropsType): JSX.Element => {
  const router = useRouter();
  const [breadcrumbs, setBreadcrumbs] = useState<Array<breadcrumbsType> | null>(null);
  const dynamicLink = props.dynamicLink;

  type breadcrumbsType = {
    breadcrumb: string;
    href: string;
  };

  useEffect(() => {
    const linkPath = router.asPath.split('/');
    linkPath.shift();

    const pathArray = linkPath.map((path, i): breadcrumbsType => {
      return { breadcrumb: path, href: '/' + linkPath.slice(0, i + 1).join('/') };
    });

    setBreadcrumbs(pathArray);
  }, [router]);

  if (!breadcrumbs) {
    return <> </>;
  }

  return (
    <Box w="100%" marginBottom="18px" aria-label="breadcrumbs">
      <Breadcrumb spacing="23px" separator={<ChevronRightIcon color="gray.500" />}>
        {breadcrumbs.map((breadcrumb, i) => {
          return (
            <BreadcrumbItem key={breadcrumb.href}>
              <Link href={breadcrumb.href}>
                <BreadcrumbLink textTransform="capitalize">
                  {breadcrumbs.length - 1 === i && dynamicLink ? dynamicLink : convertBreadcrumb(breadcrumb.breadcrumb)}
                </BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
          );
        })}
      </Breadcrumb>
    </Box>
  );
};

export default Breadcrumbs;
